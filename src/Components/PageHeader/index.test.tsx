import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { MemoryRouter } from 'react-router-dom';

import { PageHeader } from '.';

describe('<PageHeader />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <PageHeader />
      </MemoryRouter>,
    );
    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();

    const goBack = screen.queryByText('돌아가기');
    expect(goBack).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders component correctly with url', () => {
    render(
      <MemoryRouter initialEntries={['/add']}>
        <PageHeader />
      </MemoryRouter>,
    );
    const label = screen.getByText('할 일 추가');
    expect(label).toBeInTheDocument();

    const goBack = screen.queryByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack?.getAttribute('href')).toBe('/');
  });

  it('render NotFound', () => {
    render(
      <MemoryRouter initialEntries={['/not_found']}>
        <PageHeader />
      </MemoryRouter>,
    );

    const label = screen.getByText('에러');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('goback button test', () => {
    render(
      <MemoryRouter initialEntries={['/not_found']}>
        <PageHeader />
      </MemoryRouter>,
    );

    const goBack = screen.getByText('돌아가기');
    fireEvent.click(goBack);

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();
    expect(goBack).not.toBeInTheDocument();
  });
});
