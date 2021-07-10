import React from 'react';
import '../styles/UserReviews.scss';
import { FaStar } from 'react-icons/fa';

const UserReviews = ({ reviews }) => {
    return (
        <ul className="user-reviews">
            {reviews.map((review) => {
                return (
                    <li key={review._id} className="mt-3 py-3">
                        <div className="author-header mb-1">{review.user.username}</div>
                        <div className="content">
                            <FaStar size={19} className="icon mb-1 mr-1" />
                            <span className="user-reviewsSpan">
                                {(review.rating ? `${review.rating}/10` : 'N/A') +
                                    ' - ' +
                                    (review.review || 'No comment.')}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserReviews;
