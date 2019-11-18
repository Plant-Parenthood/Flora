import Component from '../Component.js';

class Header extends Component {
    onRender(dom) {
        if (localStorage.getItem('USER')) {
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                localStorage.removeItem('USER');
                location = './';
            });
        }
    }

    renderHTML() {
        const title = this.props.title || 'HIKES HIKES HIKES';

        // !!!
        // TO-DO STILL: MAKE THIS CUSTOMIZED FOR THE PLANTS APP! DELETE THIS LINE ONCE DONE!
        // !!!

        return /*html*/`
            <header>
                <img class="logo" src="./assets/hike-icon.jpg" alt="Hike Logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./hikes.html">Hikes</a>
                    <a href="./favorites.html">Favorites</a>
                </nav>
                <button class="log-out hidden">Log Out</button>
            </header>
        `;
    }
}

export default Header;