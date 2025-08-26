import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../../button';

interface TransferActionsProps {
  onTransfer: () => void;
  loading: boolean;
  disabled: boolean;
}

export const TransferActions: React.FC<TransferActionsProps> = ({
  onTransfer,
  loading,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title={loading ? 'Processando...' : 'Realizar Transferência'}
        onPress={onTransfer}
        disabled={disabled || loading}
        style={[styles.button, disabled && styles.buttonDisabled]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
