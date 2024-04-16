import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


function ImageCarousel({
    images,
    showThumbnails
}) {
    const handleDragStart = (e) => e.preventDefault();
    return (
        <div>
            <AliceCarousel mouseTracking>
                {images.map((item, index) => (
                    <div className='p-3 flex justify-center items-center' key={index}>
                        <img src={item.src} className='h-[400px]' onDragStart={handleDragStart} role="presentation" />
                    </div>

                ))}
            </AliceCarousel>
        </div>
    );
}

export default ImageCarousel;