import Component from '../Component.js';
import { makeFavorite, unFavorite, saveOrFetchHike, getCampgrounds, getWeather } from '../services/hikes-api.js';



class HikeItem extends Component {

    onRender(li) {
        const { hike, renderModal } = this.props;

        //Favorite functionality same as source- SHOULD WE CHANGE?
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-heart');
        const infoButton = li.querySelector('.info-button');

        favoriteButton.addEventListener('click', async() => {
            hike.isFavorite = !hike.isFavorite;

            if (hike.isFavorite) {
                const savedOrFetchedHike = await saveOrFetchHike(hike);
                makeFavorite(savedOrFetchedHike);
                // save the favorited hike object from the hikes API to the table hikes

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

        infoButton.addEventListener('click', async() => {
            const campgrounds = await getCampgrounds(hike.latitude, hike.longitude);

            console.log('SHOULD BE OUR CAMPGROUNDS', campgrounds);

            renderModal(hike, campgrounds);
            const weather = await getWeather(hike.latitude, hike.longitude);
            
            console.log(weather, 'weather');
        });
    }

    renderHTML() {
        //what props do we need for showing user info??
        const { hike } = this.props;
        const heartClass = hike.isFavorite ? 'is-favorite' : '';

        const difficultyValues = {
            'any': 'All Levels',
            'green': 'Easiest',
            'greenBlue': 'Easy',
            'blue': 'Medium',
            'blueBlack': 'Hard',
            'black': 'Hardest'
        };
 
        return /*html*/`
            <li class="hike-item">
                <section class="fav-info">
                    <button class="info-button">ⓘ</button>
                    <button class="favorite-heart ${heartClass}">❤</button>
                </section>
                    <img src="${hike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';">
                    <h2 class="hike-name">${hike.name}</h2>
                <summary>
                    Length: ${hike.length} m.<br>
                    Difficulty: ${difficultyValues[hike.difficulty]}<br>
                    Summary: ${hike.summary}
                </summary>

            </li>
        `;
    }
}

export default HikeItem;