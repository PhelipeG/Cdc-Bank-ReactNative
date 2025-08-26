import { 
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView, 
  StyleSheet, 
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
      <KeyboardAvoidingView 
        style={styles.keyboardContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            bounces={false}
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
            
            <View style={styles.actionsContainer}>
              <TransferActions
                onTransfer={handleTransfer}
                loading={loading}
                disabled={!fromClientId || !toClientId || !transferAmount}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 100,
  },
  actionsContainer: {
    marginTop: theme.spacing.lg,
    paddingBottom: 20,
  },
});
