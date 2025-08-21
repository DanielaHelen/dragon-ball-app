import axios, { AxiosResponse } from "axios";
import { CharacterDetail } from "../../domain/types";
import config from "../config";
import { ApiResponse } from "../types";

const API_DRGB_URL = config.apiDrgUrl;
const apiClient = axios.create({
    baseURL: API_DRGB_URL,
});

export const getCharacters = async ( filterName?: string) => {
    return await apiClient.get<ApiResponse>("/", {
        params: {
            limit:58,
            ...(filterName && { name: filterName }),
        },
    });
};

export const getCharacterById = async (id?: string): Promise<AxiosResponse<CharacterDetail, any>> => {
    return await apiClient.get(`/${id}`);
};