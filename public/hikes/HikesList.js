import Component from '../Component.js';
import HikeItem from './HikeItem.js';
import Search from './SearchSort.js';

class HikesList extends Component {

    onRender(dom) {

        const { hikes, onSearchSubmit } = this.props;
        const optionsSection = dom.querySelector('.options-section');
        const search = new Search({ 
            hikes: hikes,
            onSearchSubmit: onSearchSubmit 
        });
        optionsSection.appendChild(search.renderDOM());

        hikes.forEach(hike => {
            const props = {
                hike: hike,
                removeUnFavorites: this.props.removeUnFavorites
            };

            const hikeItem = new HikeItem(props);
            const hikeItemDOM = hikeItem.renderDOM();
            dom.appendChild(hikeItemDOM);
        });

    }

    renderHTML() {
        return /*html*/`
        <div>
            <section class="options-section">
            <!-- options go here -->
            </section>
            <ul class="hikes-list"></ul>
        </div>
        `;
    }
}

export default HikesList;
