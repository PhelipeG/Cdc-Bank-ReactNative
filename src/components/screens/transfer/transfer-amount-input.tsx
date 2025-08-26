import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme/theme';
import { formatCurrencyInput } from '../../../utils/utils';
import { Input } from '../../input';

interface TransferAmountInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const TransferAmountInput: React.FC<TransferAmountInputProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Valor da Transferência *</Text>
      <Input
        placeholder="R$ 0,00"
        keyboardType="numeric"
        value={value}
        onChangeText={(text) => onChangeText(formatCurrencyInput(text))}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.textDark,
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.success,
  },
});
