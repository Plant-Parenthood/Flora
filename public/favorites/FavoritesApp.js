// !!!
// TO-DO STILL: MODIFY THIS PAGE FOR PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

import Component from '../Component.js';
import Header from '../common/Header.js';
import HikesList from '../hikes/HikeList.js';
import { getFavorites } from '../services/hike-api.js';

class FindHikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({ hikes: [], removeUnFavorites: true });
        listSection.appendChild(hikesList.renderDOM());

        getFavorites()
            .then(hikes => {
                hikesList.update({ hikes: hikes });
            });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main> 
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- hikes list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default FindHikesApp;