import { useParams } from "react-router-dom";
import ButtonFavorite from "../../components/button-favorite/button-favorite";
import { useFavorites } from "../../context/FavoritesContext";
import { useDetails } from "../../domain/character/action";
import iconHeartEmpty from "../../assets/icons/heart-empty.svg";
import iconHeart from "../../assets/icons/heart.svg";
import "./character-details.scss";
import { Transformation } from "../../domain/character/types";
import CardDetail from "./card-detail/card-detail";

const CharacterDetails = () => {
    const { id } = useParams();
    const { data: character } = useDetails(id);
    const className = "character-details";
    const classNameHeader = `${className}-header`;
    const classNameTransform = `${className}-transform`;
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const { isFavorite, icon } = character?.id && favorites.includes(character?.id) ? { isFavorite: true, icon: { iconImg: iconHeart, iconName: "iconheart" }, } : { isFavorite: false, icon: { iconImg: iconHeartEmpty, iconName: "iconheartempty" } };
    const handleClick = () => {
        if (character?.id) {
            if (isFavorite) {
                removeFavorite(character?.id);

            } else {
                addFavorite(character?.id);
            }
        }
    }
    return (
        <div className={`${className}`}>
            <section className={classNameHeader}>
                {character && <div className={`${classNameHeader}__content`}>
                    <img className={`${classNameHeader}__content-image`} src={character.image} title={character.name} />
                    <div className={`${classNameHeader}__content-info`}>
                        <div className={`${classNameHeader}__title-wrapper`}>
                            <h1 className={`${classNameHeader}__title`}>{character.name}</h1>
                            <ButtonFavorite characterFav={id} icon={icon} onClick={handleClick} />
                        </div>
                        <p className={`${classNameHeader}__description`} title={character.description}>{character.description}</p>
                    </div>
                </div>}
            </section>
            <section className={classNameTransform}>
                <div className={`${classNameTransform}__content`}>
                    {character?.transformations && <> <h2 className={`${classNameTransform}__title`}>{character?.transformations?.length > 0 && "Transformations"}</h2><div className={`${classNameTransform}__cards`}>
                        {character?.transformations?.length ? character?.transformations?.map((transformation: Transformation) => {
                            return <CardDetail {...transformation} key={transformation.id} />;
                        }) : <div className={`${classNameTransform}__noResult`}>No transformations available</div>}
                    </div></>}
                </div>
            </section>
        </div>
    )
}
export default CharacterDetails;
