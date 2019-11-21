import Component from '../Component.js';
<<<<<<< HEAD
import { makeFavorite, unFavorite, saveOrFetchHike, getCampgrounds } from '../services/hikes-api.js';
=======
import { makeFavorite, unFavorite, saveOrFetchHike, getCampgrounds, getWeather } from '../services/hikes-api.js';
>>>>>>> c16731a24edf3342f6edcc2ea7943428f67a0213



class HikeItem extends Component {

    onRender(li) {
        const { hike, renderModal } = this.props;

        //Favorite functionality same as source- SHOULD WE CHANGE?
        const removeUnFavorites = this.props.removeUnFavorites;
<<<<<<< HEAD
        const favoriteButton = li.querySelector('.favorite-star');
        const infoButton = li.querySelector('.info-button');
=======
        const favoriteButton = li.querySelector('.favorite-heart');
        const infoButton = li.querySelector('.info-button');

>>>>>>> c16731a24edf3342f6edcc2ea7943428f67a0213
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
<<<<<<< HEAD
            console.log('SHOULD BE OUR CAMPGROUNDS', campgrounds);
            renderModal(hike, campgrounds);
=======
            const weather = await getWeather(hike.latitude, hike.longitude);
            console.log(weather, 'weather');
>>>>>>> c16731a24edf3342f6edcc2ea7943428f67a0213
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
<<<<<<< HEAD

                    <button class="favorite-star ${starClass}">❤</button>
                    <button class="info-button">i</button>
                    <a href="${hike.url}" class="hike-name"><img src="${hike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${hike.name}">${hike.name}</a>
                
=======
                <section class="fav-info">
                    <button class="info-button">ⓘ</button>
                    <button class="favorite-heart ${heartClass}">❤</button>
                </section>
                    <img src="${hike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';">
                    <h2 class="hike-name">${hike.name}</h2>
>>>>>>> c16731a24edf3342f6edcc2ea7943428f67a0213
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