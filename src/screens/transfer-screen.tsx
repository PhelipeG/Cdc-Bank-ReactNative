import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/button';
import { Input } from '../components/input';
import { Header } from '../components/layout/header';
import { useClients } from '../hooks/useClients';
import { theme } from '../theme/theme';
import { formatCurrencyInput, formatToBRL } from '../utils/utils';

export default function TransferScreen() {
  const [fromClientId, setFromClientId] = useState<string>('');
  const [toClientId, setToClientId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');

  const { clients, transferFunds, loading } = useClients();

  const fromClient = clients.find((client) => client.id === fromClientId);
  const toClient = clients.find((client) => client.id === toClientId);
  const availableDestinations = clients.filter((client) => client.id !== fromClientId);

  const handleTransfer = useCallback(async () => {
    if (!fromClientId || !toClientId || !transferAmount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const numAmount = parseFloat(transferAmount.replace(/[^\d,]/g, '').replace(',', '.'));

    if (numAmount <= 0 || isNaN(numAmount)) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para a transferência.');
      return;
    }
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
              setFromClientId('');
              setToClientId('');
              setTransferAmount('');
              setDescription('');
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
    description,
    fromClient,
    fromClientId,
    toClient?.name,
    toClientId,
    transferAmount,
    transferFunds,
  ]);

  useFocusEffect(
    useCallback(() => {
      setFromClientId('');
      setToClientId('');
      setTransferAmount('');
      setDescription('');
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header title="Transferência" />
      <ScrollView style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Cliente de Origem</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={fromClientId}
              onValueChange={setFromClientId}
            >
              <Picker.Item label="Selecione um cliente" value="" />
              {clients.map((client) => (
                <Picker.Item
                  key={client.id}
                  label={`${client.name} - ${formatToBRL(client.balance)}`}
                  value={client.id}
                />
              ))}
            </Picker>
          </View>
          {fromClient && (
            <Text style={styles.balance}>
              💰 Saldo Disponivel : {formatToBRL(fromClient.balance)}
            </Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Cliente de Destino</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={toClientId}
              onValueChange={setToClientId}
              style={styles.picker}
              enabled={!!fromClientId}
            >
              <Picker.Item label="Selecione o destino..." value="" />
              {availableDestinations.map((client) => (
                <Picker.Item key={client.id} label={client.name} value={client.id} />
              ))}
            </Picker>
          </View>
          {toClient && <Text style={styles.destinationInfo}>📥 Destino: {toClient.name}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Valor da Transferência</Text>
          <Input
            placeholder="R$ 0,00"
            keyboardType="numeric"
            value={transferAmount}
            onChangeText={(text) => setTransferAmount(formatCurrencyInput(text))}
          />
          <Input
            style={styles.inputDescription}
            value={description}
            onChangeText={setDescription}
            placeholder="Descriçao da Transferencia(opcional)"
            multiline={true}
            numberOfLines={3}
            maxLength={200}
          />

          <Button
            title={loading ? 'Processando...' : 'Realizar Transferencia'}
            onPress={handleTransfer}
            disabled={loading || !fromClientId || !toClientId || !transferAmount}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.textDark,
  },
  inputDescription: {
    textAlignVertical: 'center',
    borderRadius: 6,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  balance: {
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  destinationInfo: {
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
    borderRadius: 6,
  },
});
