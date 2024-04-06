import React, { useState } from 'react';
import ColorPicker from '~/components/ColorPicker';
import ImageCarousel from '~/components/ImageCarousel';
function HomePage() {
    const images = [
        {
            src: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/1000/600/",
        },
        {
            src: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/1000/600/",
        },
    ];

    return (
        <div>
            Home Page
            <div className='w-[200px] md:w-[550px]'>
                <ImageCarousel images={images} showThumbnails={false} />
            </div>

        </div>
    );
}

export default HomePage;