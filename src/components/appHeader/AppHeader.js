import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a tabIndex="0" href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#" tabIndex="1">Characters</a></li>
                    /
                    <li><a href="#" tabIndex="2">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;