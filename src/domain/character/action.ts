import { useCharacterById, useCharacters } from "../../services/api/api-hooks";

export const useGetCharacters = (filterName: string) => {
    const filterParams = filterName ? filterName : undefined;
    const results = useCharacters(filterParams);
    const characters = results.data?.pages.flatMap((page) => page.characters);
    const totalCharacters = results.data?.pages?.[0]?.totalCharacters;
    const allCharacters = results.data?.pages?.[0]?.allCharacters;
    return { ...results, data: characters, totalCharacters, allCharacters };
}

export const useDetails = (id?: string) => {
    const results = useCharacterById(id);
    const character = results.data;
    return {
        ...results, data: character
    }
};
