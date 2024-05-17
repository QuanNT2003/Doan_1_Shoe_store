import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


function ImageCarousel({
    images,
    showThumbnails
}) {
    const handleDragStart = (e) => e.preventDefault();
    return (
        <div className='mt-5'>
            <AliceCarousel mouseTracking>
                {images.map((item, index) => (
                    <div className=' flex justify-center items-center ' key={index}>
                        <img src={item.url} className='h-[250px] ssm:h-[300px] ' onDragStart={handleDragStart} role="presentation" />
                    </div>

                ))}
            </AliceCarousel>
        </div>
    );
}

export default ImageCarousel;