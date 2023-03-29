import { useStoreActions } from 'easy-peasy';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { FAKE_IMAGE_ENDPOINT } from 'constants';

import {Picture} from 'widgets';

import './Grid.css';

const Grid = forwardRef(function Grid(props, ref){
    const handleSliderView = useStoreActions((actions) => actions.toggleSlider);
    const {dataset } = props;
    
    return (
        <div ref={ref}  data-testid="picture-wrapper">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry gutter="10px" columnsCount={3}>
                    {
                        Array.isArray(dataset) && dataset.length && dataset.map( (image, index) => {
                            const { alt_description = 'alt desc...', id, urls : { small_s3 }, blur_hash,  } = image;
                            let width = String(image.width).substring(0, 3);
                            let height = String(image.height).substring(0, 3)
                            let color = String(image.color).substring(1);

                            const placeholder = `${FAKE_IMAGE_ENDPOINT}/${width}x${height}/${color}?text=🖼`;

                                return (
                                    <div data-id={blur_hash} ref={ref} key={id} className="grid-wrapper" onClick={() => handleSliderView({selectedImage : image,
                                        isOpen : true})}>
                                        <Picture styles={{
                                            // aspectRatio: width +"/"+ (parseInt(height)+1),
                                            width: '100%',
                                            height: '100%'
                                        }} className="responsive-image" placeholder={placeholder} alt={alt_description} src={small_s3} data-blur_hash={blur_hash}  />
                                    </div>
                                )
                        }
                            
                        )
                    }
                
                </Masonry>
            </ResponsiveMasonry>
            
            {/* OPEN render additional passed components  */}
            { props.children }
            {/* CLOSE */}
        </div>
    )
})

Grid.propTypes = {
    dataset: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            alt_description: PropTypes.any,
            urls: PropTypes.shape({
                small_s3: PropTypes.string.isRequired
            }).isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })
    ).isRequired,
    children: PropTypes.node
};

Grid.defaultProps = {
    dataset: [],
    children: null
};

export default Grid;
