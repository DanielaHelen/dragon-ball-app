
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../config/test-utils';
import CharacterDetails from './character-details';

// Mocks
let mockCharacter = {
    id: '1',
    name: 'Goku',
    ki: '9000',
    description: 'The main protagonist of Dragon Ball Z.',
    image: '/assets/images/goku.png',
    transformations: [
        {
            id: 't1',
            name: 'Super Saiyan',
            ki: '15000',
            description: 'First transformation',
            image: '/assets/images/ssj.png',
        },
    ],
};
let mockFavorites = {
    showFavorites: true,
    favorites: ["1"],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    setShowFavorites: vi.fn(),
};
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '1' }),
    };
});
vi.mock('../../domain/character/action', () => ({
    useDetails: () => ({ data: mockCharacter, isLoading: false, isError: false }),
}));
vi.mock('../../context/FavoritesContext', async () => {
    const actual = await vi.importActual<any>('../../context/FavoritesContext');
    return {
        ...actual,
        useFavorites: () => mockFavorites,
    };
});

describe('CharacterDetails', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders character name and description', () => {
        renderWithProviders(<CharacterDetails />);
        expect(screen.getByText('Goku')).toBeInTheDocument();
        expect(screen.getByText('The main protagonist of Dragon Ball Z.')).toBeInTheDocument();
    });

    it('renders character image', () => {
        renderWithProviders(<CharacterDetails />);
        const img = screen.getByTitle('Goku');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/assets/images/goku.png');
    });

    it('renders transformations section', () => {
        renderWithProviders(<CharacterDetails />);
        expect(screen.getByText('Transformations')).toBeInTheDocument();
        expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    });
    it('add favorite character', () => {
        mockFavorites = { ...mockFavorites, favorites: [""], };
        renderWithProviders(<CharacterDetails />);
        const favIcon = screen.getByAltText('iconheartempty') as HTMLImageElement;
        expect(favIcon).toBeInTheDocument();
        fireEvent.click(favIcon);

    });
    it('remove favorite character', () => {
        mockFavorites = { ...mockFavorites, favorites: ["1"], };
        renderWithProviders(<CharacterDetails />);
        const favIcon = screen.getByAltText('iconheart') as HTMLImageElement;
        expect(favIcon).toBeInTheDocument();
        fireEvent.click(favIcon);
    });

    it('shows no transformations message when none are available', () => {
        mockCharacter = { ...mockCharacter, transformations: [] };
        renderWithProviders(<CharacterDetails />);
        expect(screen.getByText('No transformations available')).toBeInTheDocument();
    });
});
