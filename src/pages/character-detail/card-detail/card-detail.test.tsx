import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../../../../config/test-utils';
import { screen } from '@testing-library/react';
import CardDetail from './card-detail';
import type { Transformation } from '../../../domain/character/types';

const mockTransformation: Transformation = {
  id: '1',
  name: 'Super Saiyan',
  ki: '9000',
  description: 'Goku transforms into a Super Saiyan.',
  image: 'goku-ssj.png',
};

describe('CardDetail', () => {
  it('renders transformation details correctly', () => {
    renderWithProviders(<CardDetail {...mockTransformation} />);
    expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    const img = screen.getByAltText('Super Saiyan');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'goku-ssj.png');
  });

  it('renders with different transformation name', () => {
    const transformation = { ...mockTransformation, name: 'Ultra Instinct' };
    renderWithProviders(<CardDetail {...transformation} />);
    expect(screen.getByText('Ultra Instinct')).toBeInTheDocument();
  });
});
