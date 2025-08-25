
import { describe, it, vi, expect } from 'vitest';
import { renderWithProviders } from '../../../config/test-utils';
import ButtonFavorite from './button-favorite';
import { screen, fireEvent } from '@testing-library/react';

const mockIcon = {
  iconImg: '/icons/heart.svg',
  iconName: 'favorite',
};

describe('ButtonFavorite component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ButtonFavorite icon={mockIcon} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the icon image with correct src and alt', () => {
    renderWithProviders(<ButtonFavorite icon={mockIcon} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockIcon.iconImg);
    expect(img).toHaveAttribute('alt', mockIcon.iconName);
  });

  it('applies small size class when size="small"', () => {
    renderWithProviders(<ButtonFavorite icon={mockIcon} size="small" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-favorite-small');
  });

  it('applies default class when size is not provided', () => {
    renderWithProviders(<ButtonFavorite icon={mockIcon} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-favorite');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithProviders(<ButtonFavorite icon={mockIcon} onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw if onClick is not provided', () => {
    renderWithProviders(<ButtonFavorite icon={mockIcon} />);
    const button = screen.getByRole('button');
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
