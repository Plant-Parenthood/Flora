import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import HikesList from './HikesList.js';
import { getHikes } from '../services/hikes-api.js';

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

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

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        //event listener for search location
        const searchForm = dom.querySelector('.location-search');

       
       

        const loadHikes = async() => {
            try {
                const hikes = await getHikes();
                localStorage.setItem('allHikes', JSON.stringify(hikes));
                hikesList.update({ hikes: hikes });
            }
            
            catch (err) {
                console.log(err);
            }

            searchForm.addEventListener('submit', async(event) => {
                event.preventDefault();
                const formData = new FormData(searchForm);
                console.log(formData, 'formData');
                const searchLocation = formData.get('search');
                console.log(searchLocation, 'searchLocation');
            

                try {
                    
                    const hikes = await getHikes(searchLocation);
                    localStorage.setItem('allHikes', JSON.stringify(hikes));
                    hikesList.update({ hikes: hikes });
                }
                
                catch (err) {
                    console.log(err);
                }
            });
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
                    <form class = "location-search">
                        <input type="text" name="search" placeholder="City, State">
                        <button class = 'location-search-button'>Search</button>
                    </form>
                    
                    <section class="list-section">
                        <!-- hikes list goes here -->        
                    </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }

}

export default HikesApp;