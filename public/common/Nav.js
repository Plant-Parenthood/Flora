import Component from '../Component.js';

class Nav extends Component {
    // onRender(dom) {
    //     if (localStorage.getItem('USER')) {
    //         const button = dom.querySelector('.log-out');
    //         button.classList.remove('hidden');

    //         button.addEventListener('click', () => {
    //             localStorage.removeItem('USER');
    //             location = './';
    //         });
    //     }
    // }

    renderHTML() {

        return /*html*/`
            <div class="nav">
                <a href="./">Home</a>
                <a href="./hikes.html">Search Hikes</a>
                <a href="./favorites.html">Favorites</a>
            </div>
        `;
    }
}

export default Nav;