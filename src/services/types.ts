import { Character } from "../domain/character/types";

export type Meta = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
};

export type Links = {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
};

export type ApiResponse = {
    items: Character[];
    meta: Meta;
    links: Links;
};
