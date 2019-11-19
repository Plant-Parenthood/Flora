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

            const filteredDifficultyResultsArray = hikes.filter(hike => (hike.difficulty === formData.get('difficulty')));

            const filteredRatingResultsArray = hikes.filter(hike => (hike.stars >= formData.get('rating')));

            const foundInboth = filteredDifficultyResultsArray.filter(element => filteredRatingResultsArray.includes(element));

            console.log(foundInboth);

            console.log(filteredRatingResultsArray, 'ratings');
            console.log(filteredDifficultyResultsArray, 'difficulty');

            
            

            // const foundInBoth = hikes.forEach((hike, i) => {
            //     if (hike[i] === filteredDifficultyResultsArray[i] && filteredRatingResultsArray[i]) {
            //         foundInBoth.push(hike[i]);
            //     }
            // });
          
            // console.log(foundInBoth);



            // const bigMamaArray = hikes.reduce((acc, hike) => {
            
            // }, []);



            // console.log(bigMamaArray);

            // filteredResultsArray.push(localStorage.getItem('rating'));
            // console.log(filteredDifficultyResultsArray);

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