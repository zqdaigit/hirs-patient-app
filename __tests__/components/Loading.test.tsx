import React from 'react';
import { render } from '@testing-library/react-native';
import { Loading } from '../../src/components/common/Loading';

describe('Loading Component', () => {
  it('renders without text', () => {
    const { toJSON } = render(<Loading />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with text', () => {
    const { getByText } = render(<Loading text="Loading..." />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('accepts custom size', () => {
    const { toJSON } = render(<Loading size="small" />);
    expect(toJSON()).toBeTruthy();
  });

  it('accepts custom color', () => {
    const { toJSON } = render(<Loading color="#FF0000" />);
    expect(toJSON()).toBeTruthy();
  });
});
