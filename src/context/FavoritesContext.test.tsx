import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FavoritesProvider, useFavorites } from './FavoritesContext';


// Mock component to consume the context
const MockConsumer: React.FC = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  return (
    <div>
      <button onClick={() => addFavorite('1')}>Add 1</button>
      <button onClick={() => removeFavorite('1')}>Remove 1</button>
      <span data-testid="favorites">{JSON.stringify(favorites)}</span>
    </div>
  );
};

describe('FavoritesContext', () => {
  it('should throw an error if useFavorites is used outside of provider', () => {
    const Consumer = () => {
      useFavorites();
      return null;
    };
    // Vitest no captura errores de hooks fuera de provider, así que usamos try/catch
    let thrownError;
    try {
      render(<Consumer />);
    } catch (e) {
      thrownError = e;
    }
    expect(thrownError).toBeInstanceOf(Error);
    expect((thrownError as Error).message).toMatch(/useFavorites.*FavoritesProvider/);
  });
  it('should provide an empty favorites list by default', () => {
    render(
      <FavoritesProvider>
        <MockConsumer />
      </FavoritesProvider>
    );
    expect(screen.getByTestId('favorites').textContent).toBe('[]');
  });

  it('should add a favorite', () => {
    render(
      <FavoritesProvider>
        <MockConsumer />
      </FavoritesProvider>
    );
    act(() => {
      screen.getByText('Add 1').click();
    });
    expect(screen.getByTestId('favorites').textContent).toBe('["1"]');
  });

  it('should remove a favorite', () => {
    render(
      <FavoritesProvider>
        <MockConsumer />
      </FavoritesProvider>
    );
    act(() => {
      screen.getByText('Add 1').click();
    });
    act(() => {
      screen.getByText('Remove 1').click();
    });
    expect(screen.getByTestId('favorites').textContent).toBe('[]');
  });

  it('should not add duplicate favorites', () => {
    render(
      <FavoritesProvider>
        <MockConsumer />
      </FavoritesProvider>
    );
    act(() => {
      screen.getByText('Add 1').click();
      screen.getByText('Add 1').click();
    });
    expect(screen.getByTestId('favorites').textContent).toBe('["1"]');
  });

  it('should handle removing a non-existent favorite gracefully', () => {
    render(
      <FavoritesProvider>
        <MockConsumer />
      </FavoritesProvider>
    );
    act(() => {
      screen.getByText('Remove 1').click();
    });
    expect(screen.getByTestId('favorites').textContent).toBe('[]');
  });
});
