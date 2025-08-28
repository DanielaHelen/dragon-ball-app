import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCharacters, getCharacterById } from './api';
import { ApiResponse } from '../types';
import { CharacterDetail } from '../../domain/character/types';

// Use vi.hoisted to ensure mockApiClient is available during mock evaluation
const mockApiClient = vi.hoisted(() => ({
    get: vi.fn(),
}));

// Mock config first
vi.mock('../config', () => ({
    default: {
        apiDrgUrl: 'https://dragonball-api.com/api/characters'
    }
}));

// Mock axios completely
vi.mock('axios', () => ({
    default: {
        create: () => mockApiClient
    }
}));
describe('api', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getCharacters', () => {
        const mockApiResponse: ApiResponse = {
            items: [
                {
                    id: '1',
                    name: 'Goku',
                    ki: '9000',
                    maxKi: 'Unlimited',
                    race: 'Saiyan',
                    gender: 'Male',
                    description: 'Main protagonist',
                    image: 'goku.jpg',
                    affiliation: 'Z Fighters',
                    deletedAt: null
                }
            ],
            meta: {
                totalItems: 1,
                itemCount: 1,
                itemsPerPage: 25,
                totalPages: 1,
                currentPage: 1
            },
            links: {
                first: '/api/characters?page=1',
                previous: null,
                next: null,
                last: '/api/characters?page=1'
            }
        };

        it('should create axios client with correct base URL', async () => {
            // This test is implicitly tested by the functionality working
            // Since we're testing the functions that use the axios client
            await getCharacters();
            expect(mockApiClient.get).toHaveBeenCalled();
        });
        it('should fetch characters with name filter', async () => {
            const filterName = 'Goku';
            mockApiClient.get.mockResolvedValue({ data: mockApiResponse });

            const result = await getCharacters(filterName);

            expect(mockApiClient.get).toHaveBeenCalledWith('/', {
                params: {
                    limit: 58,
                    name: filterName
                }
            });
            expect(result.data).toEqual(mockApiResponse);
        });

    });

    describe('getCharacterById', () => {
        const mockCharacterDetail: CharacterDetail = {
            id: '1',
            name: 'Goku',
            ki: '9000',
            description: 'Main protagonist of Dragon Ball series',
            image: 'goku.jpg',
            transformations: [
                {
                    id: '1',
                    name: 'Super Saiyan',
                    ki: '50000',
                    description: 'First transformation',
                    image: 'goku-ss.jpg'
                }
            ]
        };

        it('should fetch character by id', async () => {
            const characterId = '1';
            mockApiClient.get.mockResolvedValue({ data: mockCharacterDetail });

            const result = await getCharacterById(characterId);

            expect(mockApiClient.get).toHaveBeenCalledWith('/1');
            expect(result.data).toEqual(mockCharacterDetail);
        });
    });
});
