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
            <div class="modal">
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <p class="modal-hike-name">${modalHike.name}</p>
                    <p class="modal-hike-location">${modalHike.location}</p>
                    <img class="modal-hike-picture" src="${modalHike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${modalHike.name}">
                    <div class="modal-stars-votes-difficulty">
                        <span class="modal-num-stars">Rating: ${modalHike.stars}⭐s</span><span class="modal-num-votes">Votes: ${modalHike.starVotes}</span><span class="modal-difficulty">Difficulty: ${difficultyValues[modalHike.difficulty]}</span>
                    </div>
                    <p class="summary-decl">HIKE SUMMARY:</p>
                    <p class="modal-hike-summary">${modalHike.summary}</p>
                    <div class="modal-length-ascent-descent">
                        <span class="modal-length"><span class="bold-please">Length:</span> ${modalHike.length} miles</span><span class="modal-ascent"><span class="bold-please">Vertical ascent:</span> ${modalHike.ascent} feet</span><span class="modal-descent"><span class="bold-please">Vertical descent:</span> ${modalHike.descent} feet</span>
                    </div>
                    <div class="modal-high-low">
                        <span class="modal-high"><span class="bold-please">Max elevation:</span> ${modalHike.high} feet</span><span class="modal-low"><span class="bold-please">Minimum elevation:</span> ${modalHike.low} feet</span>
                    </div>
                    <fieldset class="modal-trail-status">
                        <legend>Trail conditions as of ${modalHike.conditionDate}</legend>
                        <p class="modal-condition-status"><span class="bold-please">Trail status:</span> ${modalHike.conditionStatus}<p>
                        <p class="modal-condition-details"><span class="bold-please">Condition details:</span> ${modalHike.conditionDetails}</p>
                    </fieldset>
                    <a class="modal-website-link" href="${modalHike.url}" target="_blank">Check out this trail's website!</a>
                    <section>
                        Campgrounds: ${JSON.stringify(campgrounds)}
                    </section>
                </div>
            </div>
            `;
        }
    }
}

export default Modal;