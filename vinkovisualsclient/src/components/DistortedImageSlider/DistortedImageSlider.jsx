import { useEffect } from "react";

const DistortedImageSlider = ({ THREE }) => {
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true,
        });

        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight * 0.6;
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        renderer.setClearColor(0x000000, 0);

        const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
        camera.position.z = 4;

        const settings = {
            wheelSensitivity: 0.01,
            touchSensitivity: 0.01,
            dragSensitivity: 0.005,
            momentumMultiplier: 2,
            smoothing: 0.1,
            slideLerp: 0.075,
            distortionDecay: 0.95,
            maxDistortion: 2.5,
            distortionSensitivity: 0.15,
            distortionSmoothing: 0.075,
            autoplaySpeed: 0.01,
            idleDelay: 1500,
        };

        const slideWidth = 2;
        const slideHeight = 2;
        const gap = 0.5;
        const slideCount = 10;
        const imagesCount = 5;
        const totalWidth = slideCount * (slideWidth + gap);
        const slideUnit = slideWidth + gap;

        const slides = [];
        let currentPosition = 0;
        let targetPosition = 0;
        let isScrolling = false;
        let autoScrollSpeed = 0;
        let lastTime = 0;
        let touchStartX = 0;
        let touchLastX = 0;
        let dragStartX = 0;
        let dragging = false;
        let idle = false;
        let idleTimeout = null;
        let peakVelocity = 0;
        let currentDistortionFactor = 0;
        let targetDistortionFactor = 0;
        let velocityHistory = [0, 0, 0, 0, 0];
        let touchDragging = false;
        let isMouseHeld = false;



        const correctImageColor = (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            return texture;
        };

        const createSlide = (index) => {
            const geometry = new THREE.PlaneGeometry(slideWidth, slideHeight, 32, 16);
            const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"];
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(colors[index % colors.length]),
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = index * (slideWidth + gap);
            mesh.userData = {
                originalVertices: [...geometry.attributes.position.array],
                index,
            };

            const imageIndex = (index % imagesCount) + 1;
            const imagePath = `/img${imageIndex}.jpg`;

            new THREE.TextureLoader().load(
                imagePath,
                (texture) => {
                    correctImageColor(texture);
                    material.map = texture;
                    material.color.set(0xffffff);
                    material.needsUpdate = true;
                    const imgAspect = texture.image.width / texture.image.height;
                    const slideAspect = slideWidth / slideHeight;

                    if (imgAspect > slideAspect) {
                        mesh.scale.y = slideAspect / imgAspect;
                    } else {
                        mesh.scale.x = imgAspect / slideAspect;
                    }
                },
                undefined,
                () => { }
            );

            scene.add(mesh);
            slides.push(mesh);
        };

        for (let i = 0; i < slideCount; i++) createSlide(i);

        slides.forEach((slide) => {
            slide.position.x -= totalWidth / 2;
            slide.userData.targetX = slide.position.x;
            slide.userData.currentX = slide.position.x;
        });

        const updateCurve = (mesh, worldPositionX, distortionFactor) => {
            const distortionCenter = new THREE.Vector2(0, 0);
            const distortionRadius = 2.0;
            const maxCurvature = settings.maxDistortion * distortionFactor;
            const positionAttribute = mesh.geometry.attributes.position;
            const originalVertices = mesh.userData.originalVertices;

            for (let i = 0; i < positionAttribute.count; i++) {
                const x = originalVertices[i * 3];
                const y = originalVertices[i * 3 + 1];
                const vertexWorldPosX = worldPositionX + x;
                const distFromCenter = Math.sqrt(
                    (vertexWorldPosX - distortionCenter.x) ** 2 + (y - distortionCenter.y) ** 2
                );

                const distortionStrength = Math.max(0, 1 - distFromCenter / distortionRadius);
                const curveZ = Math.pow(Math.sin((distortionStrength * Math.PI) / 2), 1.5) * maxCurvature;

                positionAttribute.setZ(i, curveZ);
            }

            positionAttribute.needsUpdate = true;
            mesh.geometry.computeVertexNormals();
        };

        const setIdle = () => {
            if (idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => {
                if (!isMouseHeld) {
                    idle = true;
                } else {
                    setIdle();
                }
            }, settings.idleDelay);
        };

        const onWheel = (e) => {
            e.preventDefault();
            const wheelStrength = Math.abs(e.deltaY) * 0.001;
            targetDistortionFactor = Math.min(1.0, targetDistortionFactor + wheelStrength);
            targetPosition -= e.deltaY * settings.wheelSensitivity;
            isScrolling = true;
            idle = false;
            setIdle();
            autoScrollSpeed = Math.min(Math.abs(e.deltaY) * 0.0005, 0.05) * Math.sign(e.deltaY);
        };

        const onTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchLastX = touchStartX;
            isScrolling = false;
            idle = false;
            touchDragging = true;
            autoScrollSpeed = 0;
            setIdle();
        };

        const onTouchMove = (e) => {
            if (!touchDragging) return;

            const touchX = e.touches[0].clientX;
            const deltaX = touchX - touchLastX;
            touchLastX = touchX;

            const touchStrength = Math.abs(deltaX) * 0.02;
            targetDistortionFactor = Math.min(1.0, targetDistortionFactor + touchStrength);
            targetPosition -= deltaX * settings.touchSensitivity;

            isScrolling = true;

            e.preventDefault();
        };

        const onTouchEnd = () => {
            touchDragging = false;

            const velocity = (touchLastX - touchStartX) * 0.005;
            if (Math.abs(velocity) > 0.5) {
                autoScrollSpeed = -velocity * settings.momentumMultiplier * 0.05;
                targetDistortionFactor = Math.min(
                    1.0,
                    Math.abs(velocity) * 3 * settings.distortionSensitivity
                );
                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            } else {
                autoScrollSpeed = 0;
            }
        };

        const onMouseDown = (e) => {
            dragStartX = e.clientX;
            dragging = true;
            isMouseHeld = true;
            idle = false;
            setIdle();
        };


        const onMouseMove = (e) => {
            if (!dragging) return;
            const deltaX = e.clientX - dragStartX;
            dragStartX = e.clientX;
            const dragStrength = Math.abs(deltaX) * 0.02;
            targetDistortionFactor = Math.min(1.0, targetDistortionFactor + dragStrength);
            targetPosition -= deltaX * settings.dragSensitivity;
            isScrolling = true;
        };

        const onMouseUp = () => {
            dragging = false;
            isMouseHeld = false;
        };

        const onResize = () => {
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight * 0.6;
            camera.aspect = canvasWidth / canvasHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasWidth, canvasHeight);
        };

        const animate = (time) => {
            requestAnimationFrame(animate);
            const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016;
            lastTime = time;
            const prevPos = currentPosition;

            if (isScrolling) {
                targetPosition += autoScrollSpeed;
                autoScrollSpeed *= Math.max(0.92, 0.97 - Math.abs(autoScrollSpeed) * 0.5);
                if (Math.abs(autoScrollSpeed) < 0.001) autoScrollSpeed = 0;
            }

            if (idle) targetPosition += settings.autoplaySpeed;

            currentPosition += (targetPosition - currentPosition) * settings.smoothing;

            const currentVelocity = Math.abs(currentPosition - prevPos) / deltaTime;
            velocityHistory.push(currentVelocity);
            velocityHistory.shift();

            const avgVelocity = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
            if (avgVelocity > peakVelocity) peakVelocity = avgVelocity;

            const velocityRatio = avgVelocity / (peakVelocity + 0.001);
            const isDecelerating = velocityRatio < 0.7 && peakVelocity > 0.5;
            peakVelocity *= 0.99;

            if (currentVelocity > 0.05) {
                targetDistortionFactor = Math.max(
                    targetDistortionFactor,
                    Math.min(1.0, currentVelocity * 0.1)
                );
            }

            if (isDecelerating || avgVelocity < 0.2) {
                targetDistortionFactor *= isDecelerating
                    ? settings.distortionDecay
                    : settings.distortionDecay * 0.9;
            }

            currentDistortionFactor +=
                (targetDistortionFactor - currentDistortionFactor) * settings.distortionSmoothing;

            slides.forEach((slide, i) => {
                let baseX = i * slideUnit - currentPosition;
                baseX = ((baseX % totalWidth) + totalWidth) % totalWidth;
                if (baseX > totalWidth / 2) baseX -= totalWidth;

                const isWrapping = Math.abs(baseX - slide.userData.targetX) > slideWidth * 2;
                if (isWrapping) slide.userData.currentX = baseX;

                slide.userData.targetX = baseX;
                slide.userData.currentX +=
                    (slide.userData.targetX - slide.userData.currentX) * settings.slideLerp;

                const wrapThreshold = totalWidth / 2 + slideWidth;
                if (Math.abs(slide.userData.currentX) < wrapThreshold * 1.5) {
                    slide.position.x = slide.userData.currentX;
                    updateCurve(slide, slide.position.x, currentDistortionFactor);
                }
            });

            renderer.render(scene, camera);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("resize", onResize);

        animate();

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("resize", onResize);
        };
    }, [THREE]);

    return null;
};

export default DistortedImageSlider;
