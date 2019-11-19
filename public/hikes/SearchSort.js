import Component from '../Component.js';

class Search extends Component {

    onRender(form) {

        const input = form.querySelector('input');
        // const difficultyInput = form.querySelector('input[name=difficulty]');
        // const distanceInput = form.querySelector('input[name=distance]');
        const ratingInput = form.querySelector('input[name=rating]');

        function updateControls() {
            const queryString = window.location.hash.slice(1);
            const searchParams = new URLSearchParams(queryString);

            input.value = searchParams.get('search') || '';

            // difficultyInput.value = searchParams.get('difficulty') || 0;
            // distanceInput.value = searchParams.get('distance') || '';
            ratingInput.value = searchParams.get('rating') || '';

        }

        window.addEventListener('hashchange', () => {
            updateControls();

        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);

            const queryString = window.location.hash.slice(1);
            const searchParams = new URLSearchParams(queryString);

            searchParams.set('name', formData.get('search'));

            if (formData.get('difficulty') === '') {
                searchParams.set('difficulty', 0);
            } else {
                searchParams.set('difficulty', formData.get('difficulty'));
            }

            if (formData.get('rating') === '') {
                searchParams.set('rating', 0);
            } else {
                searchParams.set('rating', formData.get('rating'));
            }

            // searchParams.set('page', 1);


            window.location.hash = searchParams.toString();
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
                <select name="difficulty">
                    <option value="green">Easiest</option>
                    <option value="greenBlue">Easy</option>
                    <option value="blue">Medium</option>
                    <option value="blueBlack">Hard</option>
                    <option value="black">Hardest</option>
                </select>
                <label>Minimum Rating (out of five): <input type="number" max=5 name="rating"></label>
                <button>🔍</button>
                <button><a href = "../hikes.html">Reset Your Search</a></button>
            </form>
        `;
    }
}

export default Search;