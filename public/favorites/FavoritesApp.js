// !!!
// TO-DO STILL: MODIFY THIS PAGE FOR PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import HikesList from '../hikes/HikesList.js';
import { getFavorites } from '../services/hikes-api.js';

class FindHikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({ hikes: [], removeUnFavorites: true });
        listSection.appendChild(hikesList.renderDOM());
        console.log('right before getFavorites', hikesList);

        getFavorites()
            .then(hikes => {
                console.log(hikes, 'in the getFavorites callback of the promise');

                //making it so that every item in the hikes array is an obj so that it can render on update correctly
                hikes.forEach(hike => {
                    JSON.parse(hike);
                });

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
                        <!-- paging goes here -->       
                    </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default FindHikesApp;