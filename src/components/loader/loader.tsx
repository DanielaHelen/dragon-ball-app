import React from "react";
import "./loader.scss";

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    return (
        <div className="loader">
            {isLoading && <div className="loader__bar"></div>}
        </div>
    );
};

export default Loader;