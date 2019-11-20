import Component from '../Component.js';

class Search extends Component {

    onRender(form) {

        const { hikes } = this.props;

        // const input = form.querySelector('input');
        // const difficultyInput = form.querySelector('input[name=difficulty]');
        // // const distanceInput = form.querySelector('input[name=distance]');
        // const ratingInput = form.querySelector('input[name=rating]');

       

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);

            localStorage.setItem('difficulty', formData.get('difficulty'));
        
            localStorage.setItem('rating', formData.get('rating'));

            localStorage.setItem('length', formData.get('length'));

            let filteredDifficultyResultsArray;

            const makeDifficultyArray = () => {
                if (formData.get('difficulty') === 'any') {
                    filteredDifficultyResultsArray = hikes;
                } else {
                    filteredDifficultyResultsArray = hikes.filter(hike => (hike.difficulty === formData.get('difficulty')));
                }
                return filteredDifficultyResultsArray;
            };

            makeDifficultyArray();

            // const filteredDifficultyResultsArray = hikes.filter(hike => (hike.difficulty === formData.get('difficulty')));

            const filteredRatingResultsArray = hikes.filter(hike => (hike.stars >= formData.get('rating')));

            let filteredLengthResultsArray;

            const makeLengthArray = () => {
                if (formData.get('length') === '') {
                    filteredLengthResultsArray = hikes;
                    console.log(formData.get('length'), 'formData length');
                    console.log(filteredLengthResultsArray, 'filter length with nothing');
                } else {
                    filteredLengthResultsArray = hikes.filter(hike => (hike.length <= formData.get('length')));
                    console.log(filteredLengthResultsArray, 'filtered length with something');
                }
                return filteredLengthResultsArray;
            };

            makeLengthArray();


            // const filteredLengthResultsArray = hikes.filter(hike => (hike.length <= formData.get('length')));
            // console.log(hikes);
           

            const foundInTwo = filteredDifficultyResultsArray.filter(element => filteredRatingResultsArray.includes(element));


            
            const foundInAll = foundInTwo.filter(element => filteredLengthResultsArray.includes(element));

            console.log(foundInAll, 'foundinall');

        });
    }

    renderHTML() {
        const hashQuery = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(hashQuery);
        const search = searchParams.get('search') || '';


        //we need to add sort functionality
        //the filter function should be updated to reflect the API better.
        return /*html*/`
            <form class="search-form">
                <input name="search" value="${search}">
                <label>Difficulty:
                <select name="difficulty">
                    <option value="any">All Levels</option>
                    <option value="green">Easiest</option>
                    <option value="greenBlue">Easy</option>
                    <option value="blue">Medium</option>
                    <option value="blueBlack">Hard</option>
                    <option value="black">Hardest</option>
                </select>
                </label>
                <label>Minimum Rating:
                    <select name="rating">
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                    </select>
                </label>
                <label>Max Length
                <input type="number" name="length" value="length" placeholder=0>
                <button>🔍</button>
                <button><a href = "../hikes.html">Reset Your Search</a></button>
            </form>
        `;
    }
}

export default Search;


// const queryString = window.location.hash.slice(1);
// const searchParams = new URLSearchParams(queryString);

// function updateControls() {
//     const queryString = window.location.hash.slice(1);
//     const searchParams = new URLSearchParams(queryString);

//     input.value = searchParams.get('search') || '';

//     // difficultyInput.value = searchParams.get('difficulty') || 0;
//     // distanceInput.value = searchParams.get('distance') || '';
//     ratingInput.value = searchParams.get('rating') || '';

// }

// window.addEventListener('hashchange', () => {
//     updateControls();

// });