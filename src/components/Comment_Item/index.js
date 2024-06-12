import React from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import noImage from '~/assets/images/no-image.png';
import { format } from 'date-fns';
function CommentItem({ comment }) {
    return (
        <div className='border-solid border-b-[1px] mb-3'>
            <div className='flex items-center mb-3'>
                <Avatar alt="Travis Howard" src={comment.user.images[0].url} className='me-3' />
                <div>{comment.user.name}</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
                <Rating value={comment.star} readOnly size='small' />
                <div className='me-4'>{format(new Date(comment.createdAt), 'dd/MM/yyyy - HH:mm')}</div>
            </div>
            <div className='mb-3'>
                {comment.note}
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
                comment.rep === false ? <div> </div> :
                    <div className='mb-3 min-w-[300px] pt-5 ps-5 bg-gray-100 rounded-md p-2 border'>
                        <div className='mb-2'>{format(new Date(comment.updatedAt), 'dd/MM/yyyy - HH:mm')}</div>
                        <div className='mb-10'>
                            {comment.rep_detail.note}
                        </div>
                        <div className='flex mb-3 pb-1'>
                            <FontAwesomeIcon icon={faThumbsUp} className='h-[20px] w-[20px] text-gray-500 me-4 cursor-pointer' />
                            {comment.rep_detail.like}
                        </div>
                    </div>
            }

        </div>
    );
}

export default CommentItem;