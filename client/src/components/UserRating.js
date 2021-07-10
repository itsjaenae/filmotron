import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/UserRating.scss';

//reference: https://www.youtube.com/watch?v=eDw46GYAIDQ&t=387s
const UserRating = ({ rating, handleRating }) => {
    const [hover, setHover] = useState(null);
    return (
        <div className="d-flex align-items-center flex-wrap user-ratingMargin">
            <h5 className="mr-2 userRating">Rate the movie:</h5>
            {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1;
          
                return (
                    <label key={i} className="user-rating">
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={handleRating}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? '#fbc531' : '#e4e5e9'}
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default UserRating;
