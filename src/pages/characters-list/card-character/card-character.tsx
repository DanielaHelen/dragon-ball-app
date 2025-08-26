import { useNavigate } from "react-router-dom";
import { Character } from "../../../domain/character/types";
import ButtonFavorite from "../../../components/button-favorite/button-favorite";
import heartEmpty from "../../../assets/icons/heart-empty.svg";
import iconHeart from "../../../assets/icons/heart.svg";
import "./card-character.scss";
import { useFavorites } from "../../../context/FavoritesContext";

const Card = (props: Character) => {
    const className = "card";
    const { id, name: label, image: img } = props;
    const navigation = useNavigate();
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const { isFavorite, icon } = favorites.includes(id) ? { isFavorite: true, icon: { iconImg: iconHeart, iconName: "iconheart" } } : { isFavorite: false, icon: { iconImg: heartEmpty, iconName: "iconheartempty" } };

    const handleClick = () => {
        if (id) {
            if (isFavorite) {
                removeFavorite(id);

            } else {
                addFavorite(id);
            }
        }
    }
    return (
        <div className={`${className}__wrapper`}>
            <div className={`${className}__img-wrapper`} onClick={(e) => {
                e.stopPropagation();
                navigation(`/detail/${id}`);
            }}>
                <img className={`${className}__img`} src={img} />
            </div>
            <div className={`${className}__info-wrapper`}>
                <div className={`${className}__divider`}></div>
                <span className={`${className}__info-name`}>{label}</span>
                <div className={`${className}__icon-fav`}>
                    <ButtonFavorite characterFav={id} size="small" icon={icon} onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default Card;
