import React, { useState } from 'react';
import './button-favorite.scss';

interface ButtonFavoriteProps {
    size?: string;
    characterFav?: string;
    icon: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({ size, icon, onClick }) => {
    const compClass = size === "small" ? "button-favorite-small" : "button-favorite";
    return (
        <div className={compClass} onClick={(e) => {
            e.stopPropagation();
            if (onClick) {
                onClick(e);
            }
        }} >

            <img
                src={icon}
                alt={icon}
                className={`${compClass}-icon`}
            />
        </div>
    );
};

export default ButtonFavorite;