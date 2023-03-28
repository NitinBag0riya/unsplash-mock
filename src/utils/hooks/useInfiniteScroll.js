import { useState } from "react";

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting
      entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
    })
  })
  
observer.observe(document.getElementById("test"))

function useInfiniteScroll({ api, elementClassName, page}){
    const [data]  = useState(false);

    return {
        data
    }
}

export default useInfiniteScroll;