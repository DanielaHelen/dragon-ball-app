import { describe, expect, it } from 'vitest';
import Loader from './loader';
import { renderWithProviders } from '../../../config/test-utils';

describe('Loader component', () => {
  it('should render without crashing', () => {
    const { container } = renderWithProviders(<Loader isLoading={true} />);
    expect(container).toBeInTheDocument();
  });

  it('should display the loader bar when isLoading is true', () => {
    const { container } = renderWithProviders(<Loader isLoading={true} />);
    const bar = container.querySelector('.loader__bar');
    expect(bar).toBeInTheDocument();
  });

  it('should not display the loader bar when isLoading is false', () => {
    const { container } = renderWithProviders(<Loader isLoading={false} />);
    const bar = container.querySelector('.loader__bar');
    expect(bar).not.toBeInTheDocument();
  });


});
