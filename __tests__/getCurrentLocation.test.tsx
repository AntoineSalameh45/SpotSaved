import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import GetCurrentLocation from '../src/components/molecules/GetCurrentLocation';
import Geolocation from '@react-native-community/geolocation';

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
}));

describe('<GetCurrentLocation />', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<GetCurrentLocation />);
    expect(getByText('Current position:')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();
  });

  it('calls getCurrentPosition on button press', async () => {
    const {getByText} = render(<GetCurrentLocation />);
    const button = getByText('Get Current Position');
    fireEvent.press(button);
    await waitFor(() =>
      expect(Geolocation.getCurrentPosition).toHaveBeenCalled(),
    );
  });

  it('displays position after successful getCurrentPosition', async () => {
    const mockCoords = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
    Geolocation.getCurrentPosition.mockImplementationOnce(success =>
      success(mockCoords),
    );
    const {getByText} = render(<GetCurrentLocation />);
    const button = getByText('Get Current Position');
    fireEvent.press(button);
    await waitFor(() =>
      expect(getByText('Latitude: 40.7128, Longitude: -74.006')).toBeTruthy(),
    );
  });

  it('displays error message on error in getCurrentPosition', async () => {
    const mockError = {message: 'Permission denied'};
    Geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error(mockError),
    );
    const {getByText} = render(<GetCurrentLocation />);
    const button = getByText('Get Current Position');
    fireEvent.press(button);
    await waitFor(() =>
      expect(getByText('GetCurrentPosition Error')).toBeTruthy(),
    );
    await waitFor(() =>
      expect(getByText(JSON.stringify(mockError))).toBeTruthy(),
    );
  });
});
