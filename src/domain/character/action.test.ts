import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGetCharacters, useDetails } from './action';
import { useCharacterById, useCharacters } from '../../services/api/api-hooks';
import { Character } from './types';

// Mock the API hooks
vi.mock('../../services/api/api-hooks', () => ({
  useCharacters: vi.fn(),
  useCharacterById: vi.fn(),
}));

const mockUseCharacters = vi.mocked(useCharacters);
const mockUseCharacterById = vi.mocked(useCharacterById);

describe('useGetCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCharacters: Character[] = [
    {
      id: '1',
      name: 'Goku',
      ki: '1000000',
      maxKi: '2000000',
      race: 'Saiyan',
      gender: 'Male',
      description: 'Protagonist of Dragon Ball',
      image: 'https://example.com/goku.jpg',
      affiliation: 'Z Fighter',
    },
    {
      id: '2',
      name: 'Vegeta',
      ki: '950000',
      maxKi: '1800000',
      race: 'Saiyan',
      gender: 'Male',
      description: 'Prince of all Saiyans',
      image: 'https://example.com/vegeta.jpg',
      affiliation: 'Z Fighter',
    },
  ];

  it('should return characters data when filter name is provided', () => {
    const filterName = 'Goku';
    const mockApiResponse = {
      data: {
        pages: [
          {
            characters: mockCharacters,
            totalCharacters: 58,
            allCharacters: mockCharacters,
            nextPage: 2,
            totalPages: 3,
          },
        ],
        pageParams: [1],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success' as const,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      isFetching: false,
      refetch: vi.fn(),
    } as any;

    mockUseCharacters.mockReturnValue(mockApiResponse);

    const { result } = renderHook(() => useGetCharacters(filterName));

    expect(mockUseCharacters).toHaveBeenCalledWith(filterName);
    expect(result.current.data).toEqual(mockCharacters);
    expect(result.current.totalCharacters).toBe(58);
    expect(result.current.allCharacters).toEqual(mockCharacters);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return characters data when filter name is empty string', () => {
    const filterName = '';
    const mockApiResponse = {
      data: {
        pages: [
          {
            characters: mockCharacters,
            totalCharacters: 58,
            allCharacters: mockCharacters,
            nextPage: 2,
            totalPages: 3,
          },
        ],
        pageParams: [1],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success' as const,
    } as any;

    mockUseCharacters.mockReturnValue(mockApiResponse);

    const { result } = renderHook(() => useGetCharacters(filterName));

    expect(mockUseCharacters).toHaveBeenCalledWith(undefined);
    expect(result.current.data).toEqual(mockCharacters);
    expect(result.current.totalCharacters).toBe(58);
    expect(result.current.allCharacters).toEqual(mockCharacters);
  });

  it('should handle multiple pages correctly', () => {
    const multiPageResponse = {
      data: {
        pages: [
          {
            characters: mockCharacters.slice(0, 1),
            totalCharacters: 58,
            allCharacters: mockCharacters,
            nextPage: 2,
            totalPages: 3,
          },
          {
            characters: mockCharacters.slice(1, 2),
            totalCharacters: 58,
            allCharacters: mockCharacters,
            nextPage: 3,
            totalPages: 3,
          },
        ],
        pageParams: [1, 2],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success' as const,
    } as any;

    mockUseCharacters.mockReturnValue(multiPageResponse);

    const { result } = renderHook(() => useGetCharacters('test'));

    expect(result.current.data).toEqual(mockCharacters);
    expect(result.current.totalCharacters).toBe(58);
  });

  it('should handle empty pages array', () => {
    const emptyPagesResponse = {
      data: {
        pages: [],
        pageParams: [],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'success' as const,
    } as any;

    mockUseCharacters.mockReturnValue(emptyPagesResponse);

    const { result } = renderHook(() => useGetCharacters('test'));

    expect(result.current.data).toEqual([]);
    expect(result.current.totalCharacters).toBeUndefined();
    expect(result.current.allCharacters).toBeUndefined();
  });

  it('should handle undefined data', () => {
    const undefinedDataResponse = {
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'success' as const,
    } as any;

    mockUseCharacters.mockReturnValue(undefinedDataResponse);

    const { result } = renderHook(() => useGetCharacters('test'));

    expect(result.current.data).toBeUndefined();
    expect(result.current.totalCharacters).toBeUndefined();
    expect(result.current.allCharacters).toBeUndefined();
  });
});

describe('useDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCharacter: Character = {
    id: '1',
    name: 'Goku',
    ki: '1000000',
    maxKi: '2000000',
    race: 'Saiyan',
    gender: 'Male',
    description: 'Protagonist of Dragon Ball',
    image: 'https://example.com/goku.jpg',
    affiliation: 'Z Fighter',
  };

  it('should return character data when id is provided', () => {
    const characterId = '1';
    const mockCharacterResponse = {
      data: mockCharacter,
      isLoading: false,
      isError: false,
      error: null,
      status: 'success' as const,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      isFetching: false,
      refetch: vi.fn(),
    } as any;

    mockUseCharacterById.mockReturnValue(mockCharacterResponse);

    const { result } = renderHook(() => useDetails(characterId));

    expect(mockUseCharacterById).toHaveBeenCalledWith(characterId);
    expect(result.current.data).toEqual(mockCharacter);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle undefined id', () => {
    const mockCharacterResponse = {
      data: mockCharacter,
      isLoading: false,
      isError: false,
      error: null,
      status: 'success' as const,
    } as any;

    mockUseCharacterById.mockReturnValue(mockCharacterResponse);

    const { result } = renderHook(() => useDetails(undefined));

    expect(mockUseCharacterById).toHaveBeenCalledWith(undefined);
    expect(result.current.data).toEqual(mockCharacter);
  });

  it('should handle error state', () => {
    const errorResponse = {
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Character not found'),
      status: 'error' as const,
    } as any;

    mockUseCharacterById.mockReturnValue(errorResponse);

    const { result } = renderHook(() => useDetails('999'));

    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
  });

});
