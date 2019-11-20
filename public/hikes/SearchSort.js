import Component from '../Component.js';
class Search extends Component {

    onRender(dom) {
        const form = dom.querySelector('.search-form');
        
        const onSearchSubmit = this.props.onSearchSubmit;
       
        form.addEventListener('submit', event => {
            event.preventDefault();
            //const { hikes } = this.props;
            const hikes = JSON.parse(localStorage.getItem('allHikes'));
            console.log(hikes);
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

            const filteredRatingResultsArray = hikes.filter(hike => (hike.stars >= formData.get('rating')));

            let filteredLengthResultsArray;

            const makeLengthArray = () => {
                if (!formData.get('length')) {
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


            const foundInTwo = filteredDifficultyResultsArray.filter(element => filteredRatingResultsArray.includes(element));


            
            const foundInAll = foundInTwo.filter(element => filteredLengthResultsArray.includes(element));

            console.log(foundInAll, 'foundinall');
            onSearchSubmit(foundInAll);

        });
    }

    renderHTML() {
        const hashQuery = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(hashQuery);
        const search = searchParams.get('search') || '';


        //we need to add sort functionality
        //the filter function should be updated to reflect the API better.
        return /*html*/`
        <div>
            <form class="search-form">
                <section class="search-box">
                <input name="search" placeholder="City, State" value="${search}">
                </section>
                <section class="difficulty">
                    <label>Difficulty:</label>
                        <select name="difficulty">
                        <option value="any">All Levels</option>
                        <option value="green">Easiest</option>
                        <option value="greenBlue">Easy</option>
                        <option value="blue">Medium</option>
                        <option value="blueBlack">Hard</option>
                        <option value="black">Hardest</option>
                    </select>
                </section>
                <section class="rating">
                    <label>Minimum Rating:
                        <select name="rating">
                            <option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                            <option value=4>4</option>
                            <option value=5>5</option>
                        </select>
                    </label>
                </section>
                <section class="length">
                    <label>Max Length</label>
                    <input class="max-length" type="number" name="length" value="length" placeholder=0> mi.
                </section>
                <section class="buttons">
                    <button class="search-button">Search</button>
                    <button class="reset-button"><a href = "../hikes.html">Reset</a></button>
                </section>
            </form>
        </div>
        `;
    }
}

export default Search;

