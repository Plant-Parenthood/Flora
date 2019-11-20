import Component from '../Component.js';
import { makeFavorite, unFavorite } from '../services/hikes-api.js';


class HikeItem extends Component {

    onRender(li) {
        const { hike } = this.props;

        //Favorite functionality same as source- SHOULD WE CHANGE? 
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
        //what props do we need for showing user info?? 
        const { hike } = this.props;
        
        const starClass = hike.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class="hike-item">

                    <button class="favorite-star ${starClass}">❤</button>
                    <a href="${hike.url}" class="hike-name"><img src="${hike.imgMedium}" alt="${hike.name}">${hike.name}</a>
                
                <summary>
                    Length: ${hike.length} m.<br>
                    Difficulty: ${hike.difficulty}<br>
                    Summary: ${hike.summary}
                </summary>

            </li>
        `;
    }
}

export default HikeItem;