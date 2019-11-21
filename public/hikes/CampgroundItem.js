import Component from '../Component.js';

class CampgroundItem extends Component {

    renderHTML() {
        const { campground } = this.props;

        return /*html*/ `
            <div class="campground-item">
                <p class="campground-name">${campground.name}</p>
                <img src="${campground.imgUrl}" alt="${campground.name} image">
                <a href="${campground.url}" target="_blank">Visit campground website!</a>
            </div>
        `;
    }
}

export default CampgroundItem;