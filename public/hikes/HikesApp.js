import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import HikesList from './HikesList.js';
import Search from './SearchSort.js';
// import Paging from './Paging.js';
import { getHikes } from '../services/hikes-api.js';

// !!!
// TO-DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const optionsSection = dom.querySelector('.options-section');
        const search = new Search({ hikes: [] });
        optionsSection.appendChild(search.renderDOM());
        
        const listSection = dom.querySelector('.list-section');
        
        const hikesList = new HikesList({ hikes: [] });
        listSection.appendChild(hikesList.renderDOM());
        
        // const paging = new Paging();
        // listSection.appendChild(paging.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const loadHikes = async() => {
            try {
                console.log('inside loadHikes');
                const hikes = await getHikes();
                search.update({ hikes: hikes });
                hikesList.update({ hikes: hikes });

                // paging.update({
                //     // This API does not give total results :(
                //     // totalResult: ?
                // });
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
                <main>
                    <section class="options-section">
                        <!-- options go here -->
                    </section>
                        
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- hikes list goes here -->        
                    </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default HikesApp;