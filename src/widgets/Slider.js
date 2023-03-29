import { useStoreState, useStoreActions } from 'easy-peasy';
import usePortal from 'react-useportal'
import PropTypes from 'prop-types';

import { PictureDetails } from 'components';

import Picture from "./Picture";

import  './Slider.css';
const { useEffect } = require("react")

const NULL_EVENT = { currentTarget: true }; // this is hack


const Slider = ({ children, ...rest }) => {
    var { openPortal, closePortal, isOpen, Portal } = usePortal({
        closeOnEsc : false,
        bindTo: document && document.getElementById('portal')
      });

    const { selectedImage, isOpen: isOpenSlider } = useStoreState(state => state.showSlider);
    const collection = useStoreState(state => state.picturesCollection)
    const handleSliderView = useStoreActions((actions) => actions.toggleSlider);;

    useEffect(() => {
        if(isOpenSlider){
            openPortal(NULL_EVENT)
        }

        return () => {
            closePortal()
        }
    }, [isOpenSlider, closePortal, openPortal])

    const handleClose = () => {
        handleSliderView({ isOpen : false });
        closePortal()
    }

    const getIndex = () => collection.findIndex(image => image.id === selectedImage.id);

    const handleNext = () => {
        let index = getIndex();
        if(index < collection.length - 1) {
            index = index + 1;
        }else {
            index = 0;
        }
        handleSliderView({ selectedImage : collection[index], isOpen : true })
    }

    const handlePrevious = () => {
        let index = getIndex();
        if(index === 0) {
            index = collection.length - 1 ;
        }else {
            index = index - 1;
        }
        handleSliderView({ selectedImage : collection[index], isOpen : true })
    }


    return(
        <>
            {
                isOpen && <Portal>
                    <div className="slider-container">
                        <div className="slider-control">
                            <button className="btn-default" onClick={handlePrevious}>Prev</button>
                            <button className="btn-default"onClick={handleClose}>Close</button>
                            <button className="btn-default" onClick={handleNext}>Next</button>
                        </div>
                        <Picture priority='lazy' className="slider-image" key={selectedImage.blur_hash} src={selectedImage.urls.regular} alt={selectedImage.alt} />

                        <PictureDetails details={selectedImage} />
                        
                        {/* OPEN render additional passed components  */}
                        { children }
                        {/* CLOSE */}
                    </div>
                </Portal>
            }
            
        </>
    )
}

Slider.defaultProps = {
    isOpen: false,
    children: null
    };
    
    Slider.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node
    };

export default Slider;