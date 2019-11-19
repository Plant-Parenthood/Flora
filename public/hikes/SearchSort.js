import Component from '../Component.js';

class Search extends Component {

    onRender(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const search = formData.get('search');

            const searchParams = new URLSearchParams();
            searchParams.set('search', search);
            searchParams.set('page', 1);
            window.location.hash = searchParams.toString();
        });

        const input = form.querySelector('input');

        window.addEventListener('hashchange', () => {
            const hashQuery = window.location.hash.slice(1);
            const searchParams = new URLSearchParams(hashQuery);
            input.value = searchParams.get('search') || '';
        });
    }

    renderHTML() {
        const hashQuery = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(hashQuery);
        const search = searchParams.get('search') || '';


        //we need to add sort/filter functionality - what are we sorting or filtering by? sort = dropdown? filter = checkboxes 

        //sort by hike length, driving distance/distance from you ? Hiking API built in sort is either quality or distance!

        // filter by is there a campground close by ? 
        return /*html*/`
            <form class="search-form">
                <input name="search" value="${search}">
                <button>🔍</button>
            </form>
        `;
    }
}

export default Search;