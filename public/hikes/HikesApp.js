import Component from '../Component.js';
import Header from '../common/Header.js';
import HikesList from './HikeItem.js';
import Search from './Search.js';
import Paging from './Paging.js';
import { getHikes } from '../services/hikes-api.js';

// !!!
// TO-DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const optionsSection = dom.querySelector('.options-section');
        const search = new Search();
        optionsSection.appendChild(search.renderDOM());
        const paging = new Paging();
        optionsSection.appendChild(paging.renderDOM());

        const listSection = dom.querySelector('.list-section');


        const hikesList = new HikesList({ hikes: [] });
        listSection.appendChild(hikesList.renderDOM());

        const loadHikes = async () => {
            try {
                const hikes = await getHikes();

                hikesList.update({ hikes: hikes });

                paging.update({
                    // This API does not give total results :(
                    // totalResult: ?
                });
            }
            catch (err) {
                console.log(err);
            }
        };

        loadHikes();
        window.addEventListener('hashchange', () => {
            loadHikes();
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                    <section class="options-section">
                        <!-- options go here -->
                    </section>
                        
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- hikes list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default HikesApp;