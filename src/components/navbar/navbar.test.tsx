import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../config/test-utils';
import Navbar from './navbar';

// Mock data and dependencies
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
        ...actual,
        Link: ({ to, children, onClick }: any) => <a href={to} onClick={onClick}>{children}</a>,
        useLocation: vi.fn(() => ({ pathname: '/' })),
    };
});

// Mock antes de importar el componente
const setShowFavoritesMock = vi.fn();
let favoritesMocks: string[] = [];
vi.mock('../../context/FavoritesContext', async () => {
    const actual = await vi.importActual<any>('../../context/FavoritesContext');
    return {
        ...actual,
        useFavorites: () => ({
            favorites: favoritesMocks,
            addFavorite: vi.fn(),
            removeFavorite: vi.fn(),
            showFavorites: false,
            setShowFavorites: setShowFavoritesMock,
        }),
    };
});

describe('Navbar component', () => {
    it('renders navbar', () => {
        const { container } = renderWithProviders(<Navbar />);
        const navbarComponent = container.querySelector('.navbar');
        expect(navbarComponent).toBeInTheDocument();
        const logo = screen.getByAltText("dragon-ball-logo");
        expect(logo).toBeInTheDocument();
        const favoritesButton = screen.getByRole('button');
        expect(favoritesButton).toBeInTheDocument();
    });

    it("navigates to '/' when logo link is clicked", () => {
        renderWithProviders(<Navbar />);
        const logoImg = screen.getByAltText('dragon-ball-logo');
        const logoLink = logoImg.closest('a');
        fireEvent.click(logoLink!);
        expect(setShowFavoritesMock).toHaveBeenCalledWith(false);
    });

    it('shows favorites list when favorites button is clicked', () => {
        renderWithProviders(<Navbar />);
        const favButton = screen.getByRole('button');
        fireEvent.click(favButton);
        expect(setShowFavoritesMock).toHaveBeenCalledWith(true);
    });
    it('shows icon when no are favorites', () => {
        renderWithProviders(<Navbar />);
        const iconNoFavorite = screen.getByAltText('iconheartEmpty');
        expect(iconNoFavorite).toBeInTheDocument();
    });
    it('shows icon when there are favorites', () => {
        favoritesMocks = ['1', '2'];
        renderWithProviders(<Navbar />);
        const icon = screen.getByAltText('iconheart');
        expect(icon).toBeInTheDocument();
    });
});
