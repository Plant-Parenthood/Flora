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
                <img class="logo" src="./assets/hike-icon-white.png" alt="Hike Logo">
                <h1>${title}</h1>
                <button class="log-out">Log out!</button>
            </header>
        `;
    }
}

export default Header;