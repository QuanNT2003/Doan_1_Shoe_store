import React from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
function CommentItem({ comment }) {
    return (
        <div className='border-solid border-b-[1px] mb-3'>
            <div className='flex items-center mb-3'>
                <Avatar alt="Travis Howard" src={comment.user.image} className='me-3' />
                <div>{comment.user.name}</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
                <Rating value={comment.rating} readOnly size='small' />
                <div className='me-4'>{comment.date}</div>
            </div>
            <div className='mb-3'>
                {comment.content}
            </div>
            <div className='flex mb-3'>
                {
                    comment.images.map((item, index) => (
                        <div key={index}>
                            <img src={item.url} className='h-[95px] w-[95px] me-2' />
                        </div>

                    ))
                }


            </div>
            <div className='flex mb-3'>
                <FontAwesomeIcon icon={faThumbsUp} className='h-[20px] w-[20px] text-gray-500 me-4 cursor-pointer' />
                {comment.like}
            </div>
            {
                comment.rep === null ? <div> </div> :
                    <div className='mb-3 min-w-[300px] pt-5 ps-5 bg-gray-100 rounded-md p-2 border'>
                        <div className='mb-2'>{comment.rep.date}</div>
                        <div className='mb-10'>
                            {comment.rep.content}
                        </div>
                        <div className='flex mb-3 pb-1'>
                            <FontAwesomeIcon icon={faThumbsUp} className='h-[20px] w-[20px] text-gray-500 me-4 cursor-pointer' />
                            {comment.rep.like}
                        </div>
                    </div>
            }

        </div>
    );
}

export default CommentItem;