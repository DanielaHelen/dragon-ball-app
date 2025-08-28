import { Transformation } from "../../../domain/character/types";
import "./card-detail.scss";
const CardDetail = (transformation: Transformation) => {
    const className = 'card-detail';
    return (
        <div className={className}>
            <div className={`${className}__img-wrapper`}>
                <img className={`${className}__img`} src={transformation.image} alt={transformation.name} />
            </div>
            <div className={`${className}__text`}>
                {transformation.name}
            </div>

        </div>
    );
};

export default CardDetail;
