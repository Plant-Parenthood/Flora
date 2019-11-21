import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import Loading from '../common/Loading.js';
import HikesList from './HikesList.js';
// import Paging from './Paging.js';
import { getHikes } from '../services/hikes-api.js';


// !!!
// TO-DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const listSection = dom.querySelector('.list-section');
        
        
        // const paging = new Paging();
        // listSection.appendChild(paging.renderDOM());
        
        
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
            finally {
                console.log('in finalllyyyyy');
                loading.update({ loading: false });
            }
        };

        loadHikes();
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