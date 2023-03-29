import { lazy, Suspense,  useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from 'easy-peasy';

import { Footer, Header } from "components";
import getPictures from "apis/photos";
import { Slider } from "widgets";


const Grid = lazy(() => import('widgets/Grid'));

function Home() {
  const picturesCollection = useStoreState(state => state.picturesCollection);
  const setImageCollection = useStoreActions((actions) => actions.addCollection);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ apiError, setApiError ] = useState({ status : false, message : null });

  const observedElements = new Set();

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
    setCurrentPage(currentPage => currentPage + 1);
  }, []);



  const gridObserver  = () => {
    const observer = new IntersectionObserver(entries => {
      let lastItem = entries[0];

      // to check that already been observed
      if (observedElements.has(lastItem.target)) return;
        if(lastItem.intersectionRatio > 0 && Math.sign(lastItem.target.getBoundingClientRect().top) !== -1){
          setCurrentPage(currentPage+1);
          
          getCollection(currentPage)
          
          observedElements.add(lastItem.target);
          
          observer.unobserve(lastItem.target); 
          observer.observe(containerRef.current.lastChild);
        }
    }, {
      rootMargin : "300px"
    });
  
    return observer;
  };


  let observer = gridObserver(containerRef, setCurrentPage, getCollection);


  useEffect(() => {
    if(containerRef.current){
      observer.observe(containerRef.current)

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
              <h6>{apiError.message} | <span onClick={retryGetCollectionApi}>NOTE : Kindly Change API Key : Click Here to retry </span>
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
