import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Character } from "../../domain/character/types";
import { ApiResponse } from "../types";
import { getCharacterById, getCharacters } from "./api";


const CHARACTERS_KEY = "getCharacters";
const CHARACTER_ID_KEY = "getCharacterById";

export const useCharacters = (filterName?: string) => {

    const characterAdapter = (response: ApiResponse | Character[], pageParam: number) => {

        if ("items" in response) {
            const { items, meta } = response;
            const pageSize = 27;
            const start = (pageParam - 1) * pageSize;
            return {
                characters: items.slice(start, start + pageSize),
                allCharacters: items,
                nextPage: pageParam + 1,
                totalPages: items.length < pageSize ? pageParam : Math.ceil(meta.totalItems / pageSize), // devuelve el número de páginas redondeando hacia arriba
                totalCharacters: meta.totalItems,

            };
        } else {
            return {
                characters: response as Character[],
                nextPage: 1 ,
                totalPages: 1,
                totalCharacters: response.length,
            }
        }
    }
    return useInfiniteQuery({
        queryKey: [CHARACTERS_KEY, filterName],
        queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
            const data = await getCharacters(filterName);

            return characterAdapter(data.data, pageParam);
        },
        getNextPageParam: (lastPage?: { nextPage: number, totalPages: number }) => {
            if (lastPage) return lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined;
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 24 * 60 * 60 * 1000, // 24 horas
    });
};

export const useCharacterById = (id?: string) => {
    return useQuery({
        queryKey: [CHARACTER_ID_KEY, id],
        queryFn: async () => {
            const data = await getCharacterById(id);
            return data.data;
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 horas
    });
}
