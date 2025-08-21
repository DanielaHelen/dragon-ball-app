import { useState } from "react";
import { useGetCharacters } from "../../domain/character/action";
import Card from "./card-character/card-character";
import "./characters-list.scss";
import Search from "./search/search";
import { useFavorites } from "../../context/FavoritesContext";
import { useCallback } from "react";

const CharactersList = () => {
    const className = "characters-list";
    const [query, setQuery] = useState<string>("");
    const {
        data: characters,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        totalCharacters: countCharacters,
        allCharacters
    } = useGetCharacters(query);
    const {showFavorites, favorites} = useFavorites();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
            fetchNextPage();
        }
    };
    const handleSearch = useCallback((query: string) => {
        if (query.length >= 3 || query.length === 0) {
            setQuery(query);
        }
    }, []);

    const filteredCharacters = allCharacters?.filter(character => favorites.includes(character.id));
    const characterList = showFavorites ? filteredCharacters : characters;
    const totalCharacters = showFavorites ? filteredCharacters?.length : countCharacters;


    return (
        <div className={`${className}__wrapper`}
            onScroll={handleScroll}
        >
            {showFavorites && <div className={`${className}__title-favorites`}>Favorites</div>}
            <div className={`${className}__search-wrapper`}>
                <Search onSearch={handleSearch} />
                <div className={`${className}-results`}> {totalCharacters ? `${totalCharacters} results` : "No results"} </div>
            </div>
            <div className={`${className}__cards-list`}>
                {characterList?.map((character) => {
                    return <Card {...character} key={character.id} />
                })}
                {isFetchingNextPage && (
                    <div className={`${className}__loading`}>Loading more...</div>
                )}
                {isError && <div className={`${className}__error`}>Error loading characters</div>}
            </div>
            {!hasNextPage && !isLoading && !showFavorites && <div className={`${className}__end`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No more characters</div>}
        </div>
    );
};

export default CharactersList;
