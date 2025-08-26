import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme/theme';
import { Input } from '../../input';

interface DescriptionInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Descrição da Transferência</Text>
      <Input
        style={styles.inputDescription}
        value={value}
        onChangeText={onChangeText}
        placeholder="Descrição da transferência (opcional)"
        multiline={true}
        numberOfLines={3}
        maxLength={200}
      />
      <Text style={styles.charCount}>{value.length}/200 caracteres</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.textDark,
  },
  inputDescription: {
    textAlignVertical: 'top',
    borderRadius: 8,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 12,
    minHeight: 80,
    backgroundColor: '#fafafa',
  },
  charCount: {
    fontSize: 12,
    color: theme.colors.textLight || '#666',
    textAlign: 'right',
    marginTop: 4,
  },
});
