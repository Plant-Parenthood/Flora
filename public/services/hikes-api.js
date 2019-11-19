const BASE_URL = '/api';

// !!!
// TO DO STILL: MAKE THIS FOR THE PLANT APP!!! DELETE THIS LINE ONCE DONE!!!
// !!!

let token = '';
const json = localStorage.getItem('USER');
if (json) {
    const user = JSON.parse(json);
    token = user.token;
}

// redirect if not on home page
if (!token && location.pathname !== '/index.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `/index.html?${searchParams.toString()}`;
}

async function fetchWithError(url, options) {
    if (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

export function getHikes() {
    const hashQuery = window.location.hash.slice(1);
    const url = `${BASE_URL}/hikes?${hashQuery}`;
    console.log(url);
    return fetchWithError(url);
}

export function getFavorites() {
    const url = `${BASE_URL}/favorites`;
    return fetchWithError(url);
}

export function makeFavorite(hike) {
    const url = `${BASE_URL}/favorites`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hike)
    });
}

export function unFavorite(hikeId) {
    const url = `${BASE_URL}/favorites/${hikeId}`;
    return fetchWithError(url, {
        method: 'DELETE',
    });
}

export function signUp(user) {
    const url = `${BASE_URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
}

export function signIn(credentials) {
    const url = `${BASE_URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}

