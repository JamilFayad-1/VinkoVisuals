import './header.css'

function Header() {

    return (
        <div className='header-container'>
            <h1>Vinko Visuals</h1>
            <nav className='header-nav'>
                <ul className='header-nav-list'>
                    <li><a href="/"></a>Catalog</li>
                    <li><a href="/"></a>Vision to reality</li>
                    <li><a href="/"></a>Vault</li>
                </ul>
            </nav>
        </div>
    );

}

export default Header;
