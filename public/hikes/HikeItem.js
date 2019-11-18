import Component from '../Component.js';
import { makeFavorite, unFavorite } from '../services/hikes-api.js';


// !!!
// TO DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikeItem extends Component {

    onRender(li) {
        const hike = this.props.hike;
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-star');
        favoriteButton.addEventListener('click', () => {
            hike.isFavorite = !hike.isFavorite;
            if (hike.isFavorite) {
                makeFavorite(hike);
            }
            else {
                unFavorite(hike.id);
                setTimeout(() => {
                    if (removeUnFavorites) {
                        li.classList.add('fade');
                        this.rootElement.remove();
                    }
                }, 300);
            }
            favoriteButton.classList.toggle('is-favorite');
        });
    }

    renderHTML() {
        const hike = this.props.hike;
        const starClass = hike.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class="hike-item">
                <h2>
                    <img src="${hike.image}">
                    <span class="hike-name">${hike.name}</span>
                    <button class="favorite-star ${starClass}">★</button>
                </h2>
                
                <p>
                    ORIGIN: ${hike.origin.name}<br>
                    SPECIES: ${hike.species}
                </p>

            </li>
        `;
    }
}

export default HikeItem;