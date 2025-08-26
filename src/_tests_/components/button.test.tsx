import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../components/button';

describe('Testando o componente <Button />', () => {
  it('deve renderizar com o título correto', () => {
    render(<Button title="Test Button" onPress={jest.fn()} />);
    expect(screen.getByText('Test Button')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    const mockOnPress = jest.fn();
    render(<Button title="Test Button" onPress={mockOnPress} />);
    fireEvent.press(screen.getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando a prop disabled for verdadeira', () => {
    const mockOnPress = jest.fn();
    render(<Button title="Disabled Button" onPress={mockOnPress} disabled={true} />);
    const button = screen.getByText('Disabled Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('deve mostrar o estado de carregamento corretamente', () => {
    render(<Button title="Loading..." onPress={jest.fn()} disabled={true} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});
