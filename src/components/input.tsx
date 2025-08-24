import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme/theme';

interface InputProps extends TextInputProps {
  placeholder: string;
}

export const Input = ({ placeholder, ...props }: InputProps) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: 6,
    marginBottom: theme.spacing.sm,
  },
});
