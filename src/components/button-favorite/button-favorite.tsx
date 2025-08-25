import React, { useState } from 'react';
import './button-favorite.scss';

interface ButtonFavoriteProps {
    size?: string;
    characterFav?: string;
    icon: {iconImg: string, iconName: string};
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({ size, icon, onClick }) => {
    const compClass = size === "small" ? "button-favorite-small" : "button-favorite";
    return (
        <button className={compClass} onClick={(e) => {
            e.stopPropagation();
            if (onClick) {
                onClick(e);
            }
        }} >

            <img
                src={icon.iconImg}
                alt={icon.iconName}
                className={`${compClass}-icon`}
            />
        </button>
    );
};

export default ButtonFavorite;
