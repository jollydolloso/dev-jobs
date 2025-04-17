import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { TestQueryProvider } from '../__helpers__/test-utils';

describe('Home Page', () => {
  it('renders page title', () => {
    render( <TestQueryProvider>
      <Home />
    </TestQueryProvider>);
    expect(screen.getByText('Add New Job')).toBeInTheDocument();
  });
});