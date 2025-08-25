import { z } from 'zod';

import { isValidDate } from '../utils/utils';

export const clientSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .refine((val) => val.trim().length > 0, {
      message: 'Nome é obrigatório',
    }),

  document: z
    .string()
    .min(1, 'Documento é obrigatório')
    .refine((doc) => {
      const clean = doc.replace(/\D/g, '');
      return clean.length === 11 || clean.length === 14;
    }, 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos'),

  ageOrFoundationDate: z
    .string()
    .min(1, 'Data é obrigatória para cadastro')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use o formato DD/MM/AAAA')
    .refine(isValidDate, {
      message: 'Data inválida',
    }),

  monthlyIncome: z
    .string()
    .min(1, 'Renda é obrigatória para cadastro')
    .refine((val) => !isNaN(Number(val.replace(/[^\d,]/g, '').replace(',', '.'))), {
      message: 'Valor inválido',
    }),
});

export type ClientFormData = z.infer<typeof clientSchema>;
