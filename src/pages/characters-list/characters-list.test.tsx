import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../config/test-utils';
import CharactersList from './characters-list';


const mockCharacters = [
    { id: "1", name: 'Goku' },
    { id: "2", name: 'Vegeta' },
];
let baseGetCharacters = {
    data: mockCharacters,
    fetchNextPage: vi.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
    isLoading: false,
    isError: false,
    totalCharacters: 2,
    allCharacters: mockCharacters,
};
let mockFavorites = { showFavorites: false, favorites: [""] };
// Mocks
vi.mock('../../domain/character/action', () => ({
    useGetCharacters: () => baseGetCharacters,
}));

vi.mock('../../context/FavoritesContext', async () => {
    const actual = await vi.importActual<any>('../../context/FavoritesContext');
    return {
        ...actual,
        useFavorites: () => mockFavorites,
    };
});
vi.mock('./card-character/card-character', () => ({
    __esModule: true,
    default: (props: any) => <div data-testid="card">{props.name}</div>,
}));
vi.mock('./search/search', () => ({
    __esModule: true,
    default: ({ onSearch }: any) => (
        <input
            data-testid="search"
            onChange={e => onSearch?.(e.target.value)}
            placeholder="SEARCH"
        />
    ),
}));


describe('CharactersList', () => {

    it('renders character cards and results count', () => {
        renderWithProviders(<CharactersList />);
        expect(screen.getByText('2 results')).toBeInTheDocument();
        expect(screen.getAllByTestId('card')).toHaveLength(2);
    });

    it('shows favorites when showFavorites is true', () => {
        mockFavorites = { showFavorites: true, favorites: ["1"] };
        renderWithProviders(<CharactersList />);
        expect(screen.getByText('Favorites')).toBeInTheDocument();
        expect(screen.getByText('1 results')).toBeInTheDocument();
        const cards = screen.getAllByTestId('card');
        expect(cards).toHaveLength(1);
        expect(cards[0]).toHaveTextContent('Goku');
    });

    it('shows loading more when isFetchingNextPage is true', () => {
        baseGetCharacters = {
            ...baseGetCharacters,
            isFetchingNextPage: true,
        };
        renderWithProviders(<CharactersList />);
        expect(screen.getByText('Loading more...')).toBeInTheDocument();
    });

    it('shows error message when isError is true', () => {
        baseGetCharacters = {
            ...baseGetCharacters,
            isError: true,
        };
        renderWithProviders(<CharactersList />);
        expect(screen.getByText('Error loading characters')).toBeInTheDocument();
    });

    it('shows "No more characters" when hasNextPage is false and not loading', () => {
        baseGetCharacters = {
            ...baseGetCharacters,
            hasNextPage: false,
            isLoading: false,
        };
        mockFavorites = { showFavorites: false, favorites: [""] };

        const { getByText } = renderWithProviders(<CharactersList />);
        expect(getByText('No more characters')).toBeInTheDocument();
    });

    it('calls fetchNextPage on scroll to bottom', () => {
        const fetchNextPage = vi.fn();
        baseGetCharacters = {
            ...baseGetCharacters,
            fetchNextPage,
            hasNextPage: true,
        };
        const { container } = renderWithProviders(<CharactersList />);
        const div = container.querySelector('.characters-list__wrapper') as HTMLDivElement;
        // Mock scroll properties since they are read-only
        Object.defineProperty(div, 'scrollTop', { value: 100, configurable: true });
        Object.defineProperty(div, 'scrollHeight', { value: 200, configurable: true });
        Object.defineProperty(div, 'clientHeight', { value: 100, configurable: true });
        fireEvent.scroll(div);
        expect(fetchNextPage).toHaveBeenCalled();
    });

    it('call handleSearch', () => {
        renderWithProviders(<CharactersList />);
        const input = screen.getByTestId('search');
        fireEvent.change(input, { target: { value: 'gok' } });
        fireEvent.change(input, { target: { value: '' } });
    });

    it('shows "No results" if no characters', () => {
        baseGetCharacters = {
            ...baseGetCharacters,
            data: [],
            allCharacters: [],
            totalCharacters: 0,
        }
        renderWithProviders(<CharactersList />);
        expect(screen.getByText('No results')).toBeInTheDocument();
    });
});
