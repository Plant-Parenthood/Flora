import Component from '../Component.js';
import HikeItem from './HikeItem.js';

// !!!
// TO DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikesList extends Component {

    onRender(dom) {
        const { hikes } = this.props;

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
            <ul class="hikes-list"></ul>
        `;
    }
}

export default HikesList;
