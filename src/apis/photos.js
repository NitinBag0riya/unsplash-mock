import { UNSPLASH_ENDPOINT } from 'constants';

// REACT.18 multiple times lifecycle update |  creating wrapper for handling API 
// OR 
// use third party packages.



const createFetch = () => {
    const fetchMap = {};
      return (url, options) => {
        if (!fetchMap[url]) {
          fetchMap[url] = fetch(url, options).then((res) => res.json());
        }
      return fetchMap[url];
    };
};

// end here //


function getPictures({page = 0, perPageCount = 20 }){
    let pictures = fetch(`${UNSPLASH_ENDPOINT}&per_page=${perPageCount}&page=${page}`).then(response => response).then(data => data.json());
    return createFetch(pictures);
};


export default getPictures;
