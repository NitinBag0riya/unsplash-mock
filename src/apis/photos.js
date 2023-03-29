import { UNSPLASH_ENDPOINT } from 'constants';

function getPictures({page = 0, perPageCount = 20 }){
    return fetch(`${UNSPLASH_ENDPOINT}&per_page=${perPageCount}&page=${page}`).then(response => response).then(data => data.json());
};

export default getPictures;
