import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, StyleSheet, Text } from 'react-native';
import { theme } from '../theme/theme';

export const Input = ({ name, control, placeholder, secureTextEntry = false }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChange}
        />
        {error && <Text style={styles.error}>{error.message}</Text>}
      </>
    )}
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
  error: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.sm,
  },
});
