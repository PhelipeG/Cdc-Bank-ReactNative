import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { formatToBRL } from '../utils/utils';
import { useClients } from './useClients';

export const useTransferForm = () => {
  const [fromClientId, setFromClientId] = useState<string>('');
  const [toClientId, setToClientId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');

  const { clients, transferFunds, loading } = useClients();

  const fromClient = clients.find((client) => client.id === fromClientId);
  const toClient = clients.find((client) => client.id === toClientId);
  const availableDestinations = clients.filter((client) => client.id !== fromClientId);

  const clearForm = useCallback(() => {
    setFromClientId('');
    setToClientId('');
    setTransferAmount('');
    setDescription('');
  }, []);

  useFocusEffect(clearForm);

  useEffect(() => {
    if (fromClientId) {
      setToClientId('');
    }
  }, [fromClientId]);

  const handleTransfer = useCallback(async () => {
    //validando esses campos
    if (!fromClientId || !toClientId || !transferAmount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const numAmount = parseFloat(transferAmount.replace(/[^\d,]/g, '').replace(',', '.'));
    if (numAmount <= 0 || isNaN(numAmount)) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para a transferência.');
      return;
    }
    // validando se o cliente de origem tem saldo suficiente(regra de negocio)
    if (!fromClient || fromClient.balance < numAmount) {
      Alert.alert('Erro', 'Saldo insuficiente para realizar a transferência.');
      return;
    }

    const finalDescription = description.trim() || 'Transferência entre contas';

    Alert.alert(
      'Confirmar Transferência',
      `Transferir ${formatToBRL(numAmount)} de ${fromClient.name} para ${toClient?.name}?\n\nDescrição: ${finalDescription}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await transferFunds(fromClientId, toClientId, numAmount, finalDescription);
              Alert.alert('Sucesso!', 'Transferência realizada com sucesso!');
              clearForm();
            } catch (error: unknown) {
              Alert.alert(
                'Erro na Transferência',
                error instanceof Error ? error.message : 'Tente novamente',
              );
            }
          },
        },
      ],
    );
  }, [
    fromClientId,
    toClientId,
    transferAmount,
    description,
    fromClient,
    toClient,
    transferFunds,
    clearForm,
  ]);

  return {
    clients,
    fromClientId,
    setFromClientId,
    toClientId,
    setToClientId,
    description,
    setDescription,
    transferAmount,
    setTransferAmount,
    fromClient,
    toClient,
    availableDestinations,
    loading,
    transferFunds,
    handleTransfer,
  };
};
