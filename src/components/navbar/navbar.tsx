import { useNavigate } from "react-router-dom";
import hearEmpty from "../../assets/icons/heart-empty.svg";
import iconHeart from "../../assets/icons/heart.svg";
import logo from "../../assets/images/Dragon_Ball_Z_logo.svg";
import { useFavorites } from "../../context/FavoritesContext";
import ButtonFavorite from "../button-favorite/button-favorite";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
    const className = "navbar";
    const navigate = useNavigate();
    const { favorites, setShowFavorites, showFavorites } = useFavorites();
    const icon = favorites.length > 0 ? { iconImg: iconHeart, iconName: "iconheart" } : { iconImg: hearEmpty, iconName: "iconheartEmpty" };
    return (
        <nav className={className}>
            <Link
                className={`${className}-logo`}
                to="/"
                onClick={() => setShowFavorites(false)}
            >
                <img src={logo} alt='dragon-ball-logo' />
            </Link>
            <div className={`${className}-favorites`}>
                <div className={`${className}-icon`}><ButtonFavorite icon={icon} onClick={() => { setShowFavorites(!showFavorites); navigate("/"); }} /></div>
                <div className={`${className}-text`}>{favorites.length}</div>
            </div>
        </nav>
    );
};

export default Navbar;
