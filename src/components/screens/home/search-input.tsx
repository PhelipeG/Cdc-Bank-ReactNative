import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';

import { theme } from '../../../theme/theme';
import { Input } from '../../input';


interface SearchInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChangeText,
  placeholder = 'Buscar por nome ou CPF/CNPJ',
  ...props 
}) => (
  <Input
    style={styles.search}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    autoCapitalize="none"
    autoCorrect={false}
    {...props}
  />
);

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 12,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});