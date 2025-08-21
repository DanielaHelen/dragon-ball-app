import { createContext, useContext, useEffect, useReducer, useState } from "react";


const FavoritesContext = createContext<{
    favorites: string[];
    addFavorite: (favorite: string) => void;
    removeFavorite: (id: string) => void;
    showFavorites: boolean;
    setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));
    const [showFavorites, setShowFavorites] = useState(false);
    const removeFavorite = (id: string) => {
        const newFavorites = favorites.filter(fav => fav !== id);
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites
        ));
    }

    const addFavorite = (id: string) => {
        const newFavorites = [...favorites, id];
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, showFavorites, setShowFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites debe ser usado dentro de FavoritesProvider");
    }
    return context;
};

export { FavoritesProvider, useFavorites };
