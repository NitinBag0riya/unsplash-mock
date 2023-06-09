import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from 'easy-peasy';

import { Footer, Header } from "components";
import getPictures from "apis/photos";
import { Slider } from "widgets";
import { debounce } from "utils";


const Grid = lazy(() => import('widgets/Grid'));

function Home() {
  const picturesCollection = useStoreState(state => state.picturesCollection);
  const setImageCollection = useStoreActions((actions) => actions.addCollection);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ apiError, setApiError ] = useState({ status : false, message : null });

  let observedElements = new Set();

  let containerRef = useRef(null);

  const getCollection = async () => {
    try {
      const pictures = await getPictures({ page : currentPage });
      setImageCollection(pictures);
      setApiError({ status : false, message : null })
    } catch (error) {
      setApiError({ status : true, message : error.message })
    }
    
  };

  const retryGetCollectionApi = () => {
    setApiError({
      status: false,
      message: null
    });
    getCollection({ page : currentPage });
  };

  useEffect( () => {
    getCollection({ page : 1 });
    setCurrentPage(currentPage+1);
  }, []);



  const gridObserver  = () => {
    const observer = new IntersectionObserver(entries => {
      let lastItem = entries[0];

      if(lastItem.intersectionRatio > 0 ){
        if(observedElements.has(lastItem.target.dataset['blur_hash'])){
          console.log('Mutiple observing same ele');
        }else {
          setCurrentPage(currentPage+1);
          getCollection(currentPage)

          observedElements.add(lastItem.target.dataset['blur_hash']);
          observer.unobserve(lastItem.target); 
          observer.observe(containerRef.current.lastChild);
        }
      
      }
    }, {
      rootMargin : "300px"
    });
  
    return observer;
  };


  let observer = gridObserver(containerRef);


  useEffect(() => {
    if(containerRef.current){
      
      debounce(observer.observe(containerRef.current))

      if(apiError.status){
        observer.disconnect();
      }
    }

    return () => observer.disconnect();

  },[containerRef, observer, apiError])
  
  return (
    <div className="">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Grid dataset={picturesCollection} ref={containerRef} >
          <Slider />
          { apiError.status && <div className="error-cotainer">
              <h6>{apiError.message} | <span onClick={retryGetCollectionApi}>Click Here to retry | NOTE: Change API KEY</span>
              </h6>
            </div>
          }
        </Grid>
      </Suspense>
      <Footer />
    </div>
  );
}

export default Home
