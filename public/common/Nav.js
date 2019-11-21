import Component from '../Component.js';

class Nav extends Component {
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
        // !!!
        // TO-DO STILL: MAKE THIS CUSTOMIZED FOR THE hikes APP! DELETE THIS LINE ONCE DONE!
        // !!!

        return /*html*/`
        <nav>
            <a href="./">Home</a>
            <a href="./hikes.html">Hikes</a>
            <a href="./favorites.html">Favorites</a>
        </nav>
        `;
    }
}

export default Nav;