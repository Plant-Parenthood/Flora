import Component from '../Component.js';
import { makeFavorite, unFavorite, saveHike } from '../services/hikes-api.js';



class HikeItem extends Component {

    onRender(li) {
        const { hike } = this.props;

        //Favorite functionality same as source- SHOULD WE CHANGE? 
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-star');
        favoriteButton.addEventListener('click', () => {
            hike.isFavorite = !hike.isFavorite;

            if (hike.isFavorite) {
                console.log(hike, 'in hike item class');
                makeFavorite(hike);
                // save the favorited hike object from the hikes API to the table hikes 
                saveHike(hike);

            }
            else {
                unFavorite(hike.id);
                // setTimeout(() => {
                //     if (removeUnFavorites) {
                //         li.classList.add('fade');
                //         this.rootElement.remove();
                //     }
                // }, 300);
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

                <h2>
                    <img src="${hike.imgSmall}" alt="${hike.name}">
                    <a href="${hike.url}" class="hike-name">${hike.name}</a>
                    <button class="favorite-star ${starClass}">★</button>
                </h2>
                
                <summary>
                    Length (miles): ${hike.length}<br>
                    Summary: ${hike.summary}<br>
                    Difficulty: ${hike.difficulty} 
                </summary>

            </li>
        `;
    }
}

export default HikeItem;