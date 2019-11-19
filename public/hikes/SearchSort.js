import Component from '../Component.js';

class Search extends Component {

    onRender(form) {

        const input = form.querySelector('input');
        const difficultyInput = form.querySelector('input[name=difficulty]');
        const distanceInput = form.querySelector('input[name=distance]');
        const ratingInput = form.querySelector('input[name=rating]');

        function updateControls() {
            const queryString = window.location.hash.slice(1);
            const searchParams = new URLSearchParams(queryString);

            input.value = searchParams.get('search') || '';

            difficultyInput.value = searchParams.get('difficulty') || '';
            distanceInput.value = searchParams.get('distance') || '';
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

            searchParams.set('page', 1);


            window.location.hash = searchParams.toString();
        });
    }

    renderHTML() {
        const hashQuery = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(hashQuery);
        const search = searchParams.get('search') || '';


        //we need to add sort functionality
        //the filter function should be updated to reflect the API better
        return /*html*/`
            <form class="search-form">
                <input name="search" value="${search}">
                <select name="difficulty">
                    <option value="Easiest">Easiest</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Hardest">Hardest</option>
                </select>
                <label>Minimum Rating: <input type="number" name="rating"></label>
                <button>🔍</button>
                <button><a href = "../hikes.html">Reset Your Search</a></button>
            </form>
        `;
    }
}

export default Search;