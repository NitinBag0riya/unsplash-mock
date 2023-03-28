import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

const Picture = (props) => {
    const { placeholder, src, priority = 'eager', alt, styles,  ...rest } = props;
    const [ image, setImage] = useState(placeholder || src );
    let customStyles = useRef(null);
        customStyles.current = styles || {};

    useEffect(() => {
        
        if(Boolean(placeholder)){
            const newImage = new Image();
            newImage.src = src;
            newImage.onload = () => {
                customStyles.current = {};
                setImage(src);
            }

            return ( () => {
                setImage(null);
            })
        }

    }, [src, placeholder])

    return <img alt={alt} loading={priority} src={image} {...rest}  style={{ ...customStyles.current }} />
}


Picture.propTypes = {
    placeholder: PropTypes.string,
    src: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['eager', 'lazy']),
    alt: PropTypes.string.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
  };
  
  Picture.defaultProps = {
    priority: 'eager',
    styles: {},
  };

export default Picture;