import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '../components/layout/header';
import {
  ClientPicker,
  DescriptionInput,
  TransferActions,
  TransferAmountInput,
} from '../components/screens/transfer';
import { useTransferForm } from '../hooks/useTransferForm';
import { theme } from '../theme/theme';

export default function TransferScreen() {
  const {
    // Form states
    fromClientId,
    setFromClientId,
    toClientId,
    setToClientId,
    description,
    setDescription,
    transferAmount,
    setTransferAmount,

    // Derived data
    clients,
    fromClient,
    toClient,
    availableDestinations,

    // Status
    loading,

    // Actions
    handleTransfer,
  } = useTransferForm();

  return (
    <View style={styles.container}>
      <Header title="Transferência" />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ClientPicker
          label="Cliente de Origem *"
          placeholder="Selecione um cliente"
          clients={clients}
          selectedClientId={fromClientId}
          onSelect={setFromClientId}
          showBalance={true}
          selectedClient={fromClient}
          enabled={true}
        />
        <ClientPicker
          label="Cliente de Destino *"
          placeholder="Selecione um cliente"
          clients={availableDestinations}
          selectedClientId={toClientId}
          onSelect={setToClientId}
          showBalance={false}
          selectedClient={toClient}
        />
        <TransferAmountInput value={transferAmount} onChangeText={setTransferAmount} />

        <DescriptionInput value={description} onChangeText={setDescription} />
        <TransferActions
          onTransfer={handleTransfer}
          loading={loading}
          disabled={!fromClientId || !toClientId || !transferAmount}
        />
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
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 140,
  },
});
