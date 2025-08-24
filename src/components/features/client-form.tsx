import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientFormData, clientSchema } from '../../schemas/client-schema';
import { Input } from '../input';
import { theme } from '../../theme/theme';
import { Button } from '../button';
import {
  formatCurrencyInput,
  formatDateInput,
  formatDocumentInput,
} from '../../utils/utils';

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  loading?: boolean;
}

export const ClientForm = ({ onSubmit, loading = false }: ClientFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      document: '',
      birthDate: '',
      monthlyIncome: '',
    },
  });
  const handleClientFormSubmit = async (data: ClientFormData) => {
    try {
      await onSubmit(data);
      reset({
        name: '',
        document: '',
        birthDate: '',
        monthlyIncome: '',
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cliente</Text>

      <View style={styles.field}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome completo"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          name="document"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="CPF ou CNPJ"
              value={value}
              onChangeText={text => {
                const formatted = formatDocumentInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
              maxLength={18}
            />
          )}
        />
        {errors.document && (
          <Text style={styles.error}>{errors.document.message}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Data de nascimento (DD/MM/AAAA)"
              value={value}
              onChangeText={text => {
                const formatted = formatDateInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
              maxLength={10}
            />
          )}
        />
        {errors.birthDate && (
          <Text style={styles.error}>{errors.birthDate.message}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          name="monthlyIncome"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Renda mensal"
              value={value}
              onChangeText={text => {
                const formatted = formatCurrencyInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.monthlyIncome && (
          <Text style={styles.error}>{errors.monthlyIncome.message}</Text>
        )}
      </View>

      <Button
        title="Salvar Cliente"
        onPress={handleSubmit(handleClientFormSubmit)}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  field: {
    marginBottom: theme.spacing.md,
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
});
