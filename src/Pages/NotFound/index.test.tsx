import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { NotFound } from '.';

describe('<NotFound />', () => {
  it('render ocmpoent correctly', () => {
    const { container } = render(<NotFound />);

    const message = screen.getByText('Not Found');
    expect(message).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
