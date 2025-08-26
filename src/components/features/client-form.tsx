import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { ClientFormData, clientSchema } from '../../schemas/client-schema';
import { theme } from '../../theme/theme';
import {
  formatCurrencyInput,
  formatDateInput,
  formatDocumentInput,
  isCNPJ,
} from '../../utils/utils';
import { Button } from '../button';
import { Input } from '../input';


interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  initialData?: Partial<ClientFormData>;
  loading?: boolean;
  isEditing?: boolean;
}

export const ClientForm = ({
  onSubmit,
  loading = false,
  isEditing = false,
  initialData,
}: ClientFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || '',
      document: initialData?.document || '',
      ageOrFoundationDate: initialData?.ageOrFoundationDate || '',
      monthlyIncome: initialData?.monthlyIncome || '',
    },
  });
  const document = watch('document');
  const isCompany = isCNPJ(document || '');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleClientFormSubmit = async (data: ClientFormData) => {
    try {
      onSubmit(data);
      if (!isEditing) {
        reset({
          name: '',
          document: '',
          ageOrFoundationDate: '',
          monthlyIncome: '',
        });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}</Text>

      <View style={styles.field}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input placeholder="Nome completo" value={value} onChangeText={onChange} />
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
              editable={!isEditing}
              style={isEditing ? styles.disabledInput : undefined}
              onChangeText={(text) => {
                if (isEditing) {
                  return;
                }
                const formatted = formatDocumentInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
              maxLength={18}
            />
          )}
        />
        {errors.document && <Text style={styles.error}>{errors.document.message}</Text>}
          {isEditing && (
          <Text style={styles.infoText}>
            💡 O documento não pode ser alterado após o cadastro (CPF/CNPJ)
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          name="ageOrFoundationDate"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={
                isCompany ? 'Data de Fundação (DD/MM/AAAA)' : 'Data de Nascimento (DD/MM/AAAA)'
              }
              value={value}
              onChangeText={(text) => {
                const formatted = formatDateInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
              maxLength={10}
            />
          )}
        />
        {errors.ageOrFoundationDate && (
          <Text style={styles.error}>{errors.ageOrFoundationDate.message}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          name="monthlyIncome"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={isCompany ? 'Receita Mensal (R$)' : 'Renda mensal (R$)'}
              value={value}
              onChangeText={(text) => {
                const formatted = formatCurrencyInput(text);
                onChange(formatted);
              }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.monthlyIncome && <Text style={styles.error}>{errors.monthlyIncome.message}</Text>}
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
    paddingBottom: 120,
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
   infoText: {
    color: theme.colors.textDark,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  disabledInput: {
    backgroundColor: theme.colors.textLight,
    borderWidth: 2,
    borderColor: theme.colors.disabledColor,
    color: theme.colors.textDark,
    opacity: 0.6,
  },
});
