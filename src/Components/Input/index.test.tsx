import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Input } from '.';

describe('<Input />', () => {
  it('render component correctly', () => {
    const { container } = render(<Input value="default value" />);

    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        font-size: 16px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #bdbdbd;
        outline: none;
      }

      <div>
        <input
          class="c0"
          value="default value"
        />
      </div>
    `);
  });

  it('render placeholder correctly', () => {
    render(<Input placeholder="default value" />);

    const input = screen.getByPlaceholderText('default value');
    expect(input).toBeInTheDocument();
  });

  it('change the data', () => {
    render(<Input placeholder="default value" />);
    const input = screen.getByPlaceholderText('default value') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'study react' } });
    expect(input.value).toBe('study react');
  });
});
