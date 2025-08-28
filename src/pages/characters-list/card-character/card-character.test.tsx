import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../config/test-utils';
import Card from './card-character';


const mockNavigate = vi.fn();
const mockCharacters = {
    id: "1",
    name: 'pepito',
    image: 'pepito.png',
}
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
vi.mock('../../character-detail/character-details.tsx', async () => {
    const actual = await vi.importActual<any>('../../character-detail/character-details.tsx');
    return {
        ...actual,
        CharacterDetails: () => <div>Character Details</div>,
    };
});

describe('Card', () => {

    it('should render the character name and image', () => {
        const { getByText, getAllByRole } = renderWithProviders(<Card {...mockCharacters} />);
        const name = getByText('pepito');
        expect(name).toBeInTheDocument();
        const img = getAllByRole('img');
        expect(img[0]).toHaveAttribute('src', 'pepito.png');
    });

    it('should display the favorite button', () => {
        const { container } = renderWithProviders(<Card {...mockCharacters} />);
        screen.debug();
        const favButton = container.querySelector('.button-favorite-small') as HTMLDivElement;
        expect(favButton).toBeInTheDocument();
        // Simulate clicking to add favorites
        fireEvent.click(favButton);
        // Simulate clicking to remove favorites
        fireEvent.click(favButton);
    });


    it('should navigate to detail when clicking the image', () => {
        const {  container } = renderWithProviders(<Card {...mockCharacters} />);
        const cardImg = container.querySelector('.card__img') as HTMLImageElement;
        expect(cardImg).toBeInTheDocument();
        fireEvent.click(cardImg);
        expect(mockNavigate).toHaveBeenCalledWith('/detail/1');
    });

});
