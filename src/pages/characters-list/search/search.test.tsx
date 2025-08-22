import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../test-utils';
import Search from './search';



describe('Search', () => {

  const onSearch = vi.fn();

  it('calls onSearch when writing to the input', () => {
    const { getByTestId } = renderWithProviders(<Search onSearch={onSearch} />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'goku' } });
    expect(onSearch).toHaveBeenCalledWith('goku');
  });

  it('clears the input and calls onSearch with an empty string when clicking the clear icon', () => {
    const { getByTestId, container } = renderWithProviders(<Search onSearch={onSearch} />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vegeta' } });
    const clearBtn = container.querySelector('.search__clear-icon') as HTMLButtonElement;
    fireEvent.click(clearBtn);
    expect(onSearch).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });

  it('autofocus the input on render', () => {
    const { getByTestId } = renderWithProviders(<Search />);
    const input = getByTestId('search-input');
    expect(document.activeElement).toBe(input);
  });

  it('calls onSearch when writing to the input', () => {
    const { getByTestId } = renderWithProviders(<Search onSearch={onSearch} />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'goku' } });
    expect(onSearch).toHaveBeenCalledWith('goku');
  });

  it('placeholder disappears on focus and reappears on blur', () => {
    const { getByTestId } = renderWithProviders(<Search />);
    const input = getByTestId('search-input');
    fireEvent.focus(input);
    expect(input).toHaveAttribute('placeholder', '');
    fireEvent.blur(input);
    expect(input).toHaveAttribute('placeholder', 'SEARCH A CHARACTER...');
  });

  it('does not throw if onSearch is not provided', () => {
    const { getByTestId } = renderWithProviders(<Search />);
    const input = getByTestId('search-input');
    expect(() => {
      fireEvent.change(input, { target: { value: 'piccolo' } });
    }).not.toThrow();
  });
});
