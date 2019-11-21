import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import HikesList from './HikesList.js';
// import Paging from './Paging.js';
import { getHikes } from '../services/hikes-api.js';

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({
            hikes: [],
            onSearchSubmit: (array) => {
                let searchedHikes;
                if (!array){
                    searchedHikes = this.state.hikes;
                }
                else {
                    searchedHikes = array;
                }
                const updatedProps = { hikes: searchedHikes };
                hikesList.update(updatedProps);
            }
        });
        listSection.appendChild(hikesList.renderDOM());

        // const paging = new Paging();
        // listSection.appendChild(paging.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const loadHikes = async() => {
            try {
                const hikes = await getHikes();
                localStorage.setItem('allHikes', JSON.stringify(hikes));
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