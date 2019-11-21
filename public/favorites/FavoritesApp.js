import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import HikesList from '../hikes/HikesList.js';
import { getFavorites } from '../services/hikes-api.js';

class FindHikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({ hikes: [], removeUnFavorites: true });
        listSection.appendChild(hikesList.renderDOM());

        getFavorites()
            .then(hikes => {
                hikesList.update({ hikes: hikes });
            });
        
        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main>
                        <section class="list-section">
                            <!-- hikes list goes here -->     
                        </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default FindHikesApp;