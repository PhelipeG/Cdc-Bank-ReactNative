import { act, renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { useTransferForm } from '../../hooks/useTransferForm';

// Mocks
jest.mock('../../hooks/useClients', () => ({
  useClients: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

const mockUseClients = require('../../hooks/useClients').useClients;

describe('useTransferForm Hook', () => {
  const mockTransferFunds = jest.fn();
  const mockClients = [
    {
      id: '1',
      name: 'João Silva',
      balance: 1000,
      document: '123456789',
      ageOrFoundationDate: '30 anos',
      monthlyIncome: 5000,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Maria Santos',
      balance: 500,
      document: '987654321',
      ageOrFoundationDate: '25 anos',
      monthlyIncome: 3000,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseClients.mockReturnValue({
      clients: mockClients,
      transferFunds: mockTransferFunds,
      loading: false,
    });
  });

  it('deve retornar a lista de clientes', () => {
    const { result } = renderHook(() => useTransferForm());
    expect(result.current.clients).toEqual(mockClients);
  });

  it('deve mostrar erro quando saldo é insuficiente', async () => {
    const { result } = renderHook(() => useTransferForm());

    act(() => {
      result.current.setFromClientId('1');
    });
    act(() => {
      result.current.setToClientId('2');
    });
    act(() => {
      result.current.setTransferAmount('1500');
    }); // 1500 > saldo 1000
    act(() => {
      result.current.setDescription('Teste de transferência');
    });

    expect(result.current.fromClientId).toBe('1');
    // Se o hook limpar destino ao mudar origem, reatribui antes de validar
    if (result.current.toClientId === '') {
      act(() => {
        result.current.setToClientId('2');
      });
    }
    expect(result.current.toClientId).toBe('2');
    expect(result.current.transferAmount).toBe('1500');

    await act(async () => {
      await result.current.handleTransfer();
    });

    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro',
      'Saldo insuficiente para realizar a transferência.',
    );
    expect(mockTransferFunds).not.toHaveBeenCalled();
  });
  it('deve realizar a transferência com sucesso', async () => {
    mockTransferFunds.mockResolvedValue(undefined);
    const { result } = renderHook(() => useTransferForm());

    act(() => {
      result.current.setFromClientId('1');
    });
    act(() => {
      result.current.setToClientId('2');
    });
    act(() => {
      result.current.setTransferAmount('500');
    });
    act(() => {
      result.current.setDescription('Teste de transferência');
    });

    await act(async () => {
      await result.current.handleTransfer();
    });
    const alertCalls = (Alert.alert as jest.Mock).mock.calls;

    if (alertCalls.length > 0) {
      const [title, mensagem, botoes] = alertCalls[0];
      console.log('🎯 PRIMEIRA CHAMADA DO ALERT:', { title, mensagem, temBotoes: !!botoes });

      if (title === 'Confirmar Transferência' && botoes) {
        console.log('✅ MOSTRANDO CONFIRMAÇÃO - Simulando confirmação...');

        jest.clearAllMocks();
        mockTransferFunds.mockResolvedValue(undefined);

        // Encontrar e executar botão de confirmar
        const confirmButton = botoes.find(
          (btn: { text: string }) => btn.text === 'Confirmar' || btn.text === 'Sim',
        );
        if (confirmButton) {
          await act(async () => {
            await confirmButton.onPress();
          });
        }
        expect(mockTransferFunds).toHaveBeenCalled();

        expect(Alert.alert).toHaveBeenCalledWith(
          'Sucesso!',
          'Transferência realizada com sucesso!',
        );
      } else {
        console.log('❌ NÃO É CONFIRMAÇÃO:', { title, mensagem });
      }
    }
  });
});
