import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../src/components/common/Input';

describe('Input Component', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Input label="Test Label" value="" onChangeText={() => {}} />
    );
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChangeText={() => {}} />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" value="" onChangeText={onChangeTextMock} />
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });

  it('displays error message', () => {
    const { getByText } = render(
      <Input value="" onChangeText={() => {}} error="This is an error" />
    );
    expect(getByText('This is an error')).toBeTruthy();
  });

  it('displays entered value', () => {
    const { getByDisplayValue } = render(
      <Input value="test value" onChangeText={() => {}} />
    );
    expect(getByDisplayValue('test value')).toBeTruthy();
  });
});
