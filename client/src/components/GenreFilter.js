import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/GenreFilter.css';
import "bootstrap/dist/css/bootstrap.css";

const setClass = (genre, active) => {
    const classButtons = 'list-item';
    return genre === active ? classButtons + ' list-item-active' : classButtons;
};

const GenreFilters = ({ genres, currentGenre, setCurrentGenre }) => {
    const handleOnClick = (genre) => {
        setCurrentGenre(genre);
    };
    return (
        <div className="filter">
        <div className="genre-filter-container ">
            <label>Genres</label>
            <ListGroup as="ul">
                <ListGroup.Item
                    as="li"
                    className={setClass('All', currentGenre)}
                    onClick={() => handleOnClick('All')}
                >
                    All
                </ListGroup.Item>
                {genres &&
                    genres.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item._id}
                            className={setClass(item.genre, currentGenre)}
                            onClick={() => handleOnClick(item.genre)}
                        >
                            {item.genre}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
        </div>
    );
};

export default GenreFilters;

