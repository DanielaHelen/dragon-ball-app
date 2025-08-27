import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useCharacters, useCharacterById } from './api-hooks';
import * as api from './api';
import { ApiResponse } from '../types';
import { CharacterDetail } from '../../domain/character/types';

// Mock the API functions
vi.mock('./api');
const mockedApi = vi.mocked(api);

// Test wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('api-hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('useCharacters', () => {
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
        },
        {
          id: '2',
          name: 'Vegeta',
          ki: '8500',
          maxKi: 'Very High',
          race: 'Saiyan',
          gender: 'Male',
          description: 'Prince of Saiyans',
          image: 'vegeta.jpg',
          affiliation: 'Z Fighters',
          deletedAt: null
        }
      ],
      meta: {
        totalItems: 58,
        itemCount: 2,
        itemsPerPage: 25,
        totalPages: 3,
        currentPage: 1
      },
      links: {
        first: '/api/characters?page=1',
        previous: null,
        next: '/api/characters?page=2',
        last: '/api/characters?page=3'
      }
    };

    it('should fetch characters successfully without filter', async () => {
      mockedApi.getCharacters.mockResolvedValue({ data: mockApiResponse } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacters).toHaveBeenCalledWith(undefined);
      expect(result.current.data?.pages[0].characters).toHaveLength(2);
      expect(result.current.data?.pages[0].totalCharacters).toBe(58);
    });

    it('should fetch characters with filter name', async () => {
      const filterName = 'Goku';
      mockedApi.getCharacters.mockResolvedValue({ data: mockApiResponse } as any);

      const { result } = renderHook(() => useCharacters(filterName), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacters).toHaveBeenCalledWith(filterName);
      expect(result.current.data?.pages[0].characters).toHaveLength(2);
    });

    it('should handle pagination correctly with page size 27', async () => {
      const largeMockResponse = {
        ...mockApiResponse,
        items: Array.from({ length: 54 }, (_, i) => ({
          id: `${i + 1}`,
          name: `Character ${i + 1}`,
          ki: '1000',
          maxKi: 'High',
          race: 'Human',
          gender: 'Male',
          description: `Character description ${i + 1}`,
          image: `character${i + 1}.jpg`,
          affiliation: 'Earth',
          deletedAt: null
        }))
      };

      mockedApi.getCharacters.mockResolvedValue({ data: largeMockResponse } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const firstPage = result.current.data?.pages[0];
      expect(firstPage?.characters).toHaveLength(27);
      expect(firstPage?.nextPage).toBe(2);
      expect(firstPage?.totalPages).toBe(3);
    });

    it('should handle character adapter with ApiResponse structure', async () => {
      mockedApi.getCharacters.mockResolvedValue({ data: mockApiResponse } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const pageData = result.current.data?.pages[0];
      expect(pageData).toHaveProperty('characters');
      expect(pageData).toHaveProperty('allCharacters');
      expect(pageData).toHaveProperty('nextPage');
      expect(pageData).toHaveProperty('totalPages');
      expect(pageData).toHaveProperty('totalCharacters');
    });

    it('should handle character adapter with Character array structure', async () => {
      const mockCharacterArray = mockApiResponse.items;
      mockedApi.getCharacters.mockResolvedValue({ data: mockCharacterArray } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const pageData = result.current.data?.pages[0];
      expect(pageData?.characters).toEqual(mockCharacterArray);
      expect(pageData?.nextPage).toBe(1);
      expect(pageData?.totalPages).toBe(1);
      expect(pageData?.totalCharacters).toBe(mockCharacterArray.length);
    });

    it('should determine next page correctly when total pages exceeded', async () => {
      const smallMockResponse = {
        ...mockApiResponse,
        items: Array.from({ length: 20 }, (_, i) => ({
          id: `${i + 1}`,
          name: `Character ${i + 1}`,
          ki: '1000',
          maxKi: 'High',
          race: 'Human',
          gender: 'Male',
          description: `Character description ${i + 1}`,
          image: `character${i + 1}.jpg`,
          affiliation: 'Earth',
          deletedAt: null
        })),
        meta: {
          ...mockApiResponse.meta,
          totalItems: 20
        }
      };

      mockedApi.getCharacters.mockResolvedValue({ data: smallMockResponse } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const pageData = result.current.data?.pages[0];
      expect(pageData?.totalPages).toBe(1);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockedApi.getCharacters.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('should use correct query key with filter', async () => {
      const filterName = 'Vegeta';
      mockedApi.getCharacters.mockResolvedValue({ data: mockApiResponse } as any);

      const { result } = renderHook(() => useCharacters(filterName), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacters).toHaveBeenCalledWith(filterName);
    });

    it('should have correct stale time configuration', async () => {
      mockedApi.getCharacters.mockResolvedValue({ data: mockApiResponse } as any);

      const { result } = renderHook(() => useCharacters(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Data should be considered fresh (not stale)
      expect(result.current.isStale).toBe(false);
    });
  });

  describe('useCharacterById', () => {
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

    it('should fetch character by id successfully', async () => {
      const characterId = '1';
      mockedApi.getCharacterById.mockResolvedValue({ data: mockCharacterDetail } as any);

      const { result } = renderHook(() => useCharacterById(characterId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacterById).toHaveBeenCalledWith(characterId);
      expect(result.current.data).toEqual(mockCharacterDetail);
    });

    it('should handle undefined id', async () => {
      mockedApi.getCharacterById.mockResolvedValue({ data: mockCharacterDetail } as any);

      const { result } = renderHook(() => useCharacterById(undefined), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacterById).toHaveBeenCalledWith(undefined);
      expect(result.current.data).toEqual(mockCharacterDetail);
    });

    it('should handle empty string id', async () => {
      mockedApi.getCharacterById.mockResolvedValue({ data: mockCharacterDetail } as any);

      const { result } = renderHook(() => useCharacterById(''), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacterById).toHaveBeenCalledWith('');
      expect(result.current.data).toEqual(mockCharacterDetail);
    });

    it('should handle API errors', async () => {
      const characterId = '999';
      const errorMessage = 'Character not found';
      mockedApi.getCharacterById.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useCharacterById(characterId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('should use correct query key', async () => {
      const characterId = '1';
      mockedApi.getCharacterById.mockResolvedValue({ data: mockCharacterDetail } as any);

      const { result } = renderHook(() => useCharacterById(characterId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedApi.getCharacterById).toHaveBeenCalledWith(characterId);
    });

    it('should have correct stale time configuration', async () => {
      const characterId = '1';
      mockedApi.getCharacterById.mockResolvedValue({ data: mockCharacterDetail } as any);

      const { result } = renderHook(() => useCharacterById(characterId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Data should be considered fresh (not stale)
      expect(result.current.isStale).toBe(false);
    });

    it('should return character with transformations', async () => {
      const characterId = '1';
      const characterWithTransformations = {
        ...mockCharacterDetail,
        transformations: [
          {
            id: '1',
            name: 'Super Saiyan',
            ki: '50000',
            description: 'First transformation',
            image: 'goku-ss.jpg'
          },
          {
            id: '2',
            name: 'Super Saiyan 2',
            ki: '100000',
            description: 'Second transformation',
            image: 'goku-ss2.jpg'
          }
        ]
      };

      mockedApi.getCharacterById.mockResolvedValue({ data: characterWithTransformations } as any);

      const { result } = renderHook(() => useCharacterById(characterId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.transformations).toHaveLength(2);
      expect(result.current.data?.transformations?.[0].name).toBe('Super Saiyan');
      expect(result.current.data?.transformations?.[1].name).toBe('Super Saiyan 2');
    });
  });
});
