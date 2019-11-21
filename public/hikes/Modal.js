import Component from '../Component.js';

class Modal extends Component {

    renderHTML() {

        const { modalHike, campgrounds } = this.props;
        const strigifiedModalHike = JSON.stringify(modalHike);
        const strigifiedEmptyObject = JSON.stringify({});
        if (strigifiedModalHike === strigifiedEmptyObject){
            return /*html*/ `
                <div>
                </div>
            `;
        } else {
            const difficultyValues = {
                'any': 'All Levels',
                'green': 'Easiest',
                'greenBlue': 'Easy',
                'blue': 'Medium',
                'blueBlack': 'Hard',
                'black': 'Hardest'
            };

        
            return /*html*/ `
            <div class=modal>
                <h1 class="hike-name">${modalHike.name}</h1>
                <h3 class="hike-location">${modalHike.location}</h3>
                <img class="hike-picture" src="${modalHike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${modalHike.name}">
                <div class="stars-votes-difficult">
                    <span class="num-stars">Rating: ${modalHike.stars}⭐s</span><span class="num-votes">Votes: ${modalHike.starVotes}</span><span class="difficulty">Difficulty: ${difficultyValues[modalHike.difficulty]}</span>
                </div>
                <p class="hike-summary">${modalHike.summary}</p>
                <div class="length-high-low">
                    <span class="length">Length: ${modalHike.length} miles</span><span class="ascent">Vertical ascent: ${modalHike.ascent} feet</span><span class="descent">Vertical descent: ${modalHike.descent} feet</span><span class="high">Max elevation: ${modalHike.high} feet</span><span class="low">Minimum elevation: ${modalHike.low} feet</span>
                </div>
                <fieldset class="trail-status">
                    <legend>Trail conditions as of ${modalHike.conditionDate}</legend>
                    <p class="condition-status">Trail condition: ${modalHike.conditionStatus}<p>
                    <p class="condition-details">Condition details: ${modalHike.conditionDetails}</p>
                </fieldset>
                <a class="website-link" src="${modalHike.url}" target="_blank">Check out this trail's website!</a>
                <section>
                    Campgrounds: ${JSON.stringify(campgrounds)}
                </section>
            </div>
            `;
        }
    }
}

export default Modal;