import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { Header } from '../../components/layout/header';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('../../services/storage', () => ({
  storage: {
    getItem: jest.fn().mockResolvedValue(null),
    setItem: jest.fn().mockResolvedValue(undefined),
    removeItem: jest.fn().mockResolvedValue(undefined),
    clear: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('../../contexts/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
    loading: false,
  }),
}));
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
    loading: false,
  }),
}));

describe('Testando o componente <Header />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('deve renderizar o título corretamente', () => {
    render(<Header title="Test Header" />);
    console.log(screen.debug());
    expect(screen.getByText('Test Header')).toBeTruthy();
  });
  it('deve renderizar título vazio', () => {
    render(<Header title="" />);
    console.log(screen.debug());
    expect(screen.queryByText('')).toBeTruthy();
  });
});
