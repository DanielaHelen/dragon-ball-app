export type Character = {
    id: string;
    name?: string;
    ki?: string;
    maxKi?: string;
    race?: string;
    gender?: string;
    description?: string;
    image?: string;
    affiliation?: string;
    deletedAt?: string | null;
};
export type Transformation = {
    id: string;
    name: string;
    ki: string;
    description: string;
    image: string;
}

export type CharacterDetail = {
    id: string;
    name: string;
    ki: string;
    description: string;
    image: string;
    transformations?: Transformation[];
}