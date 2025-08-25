import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const queryClient = new QueryClient();

function renderWithProviders(children: ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export { render, renderWithProviders };
