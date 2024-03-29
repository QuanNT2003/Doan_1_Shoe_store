import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


function ImageCarousel({ images }) {

    return (
        <div>
            <ImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                items={images}
                renderItem={(item) =>
                    <img src={item.src} className='p-2' />
                }
                showNav={false}
                autoPlay={true}
            />
        </div>
    );
}

export default ImageCarousel;