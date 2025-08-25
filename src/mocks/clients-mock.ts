import { Client } from '../models/client';

export const clientsMock: Client[] = [
  // ✅ PESSOAS FÍSICAS - com idades reais
  {
    id: '1',
    name: 'João Silva',
    document: '123.456.789-00',
    ageOrFoundationDate: '15/03/1991', // 32 anos
    monthlyIncome: 3000.0,
    balance: 1500.75,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    document: '987.654.321-00',
    ageOrFoundationDate: '22/08/1996', // 27 anos
    monthlyIncome: 2500.0,
    balance: 500.2,
    createdAt: '2024-01-16T10:00:00.000Z',
    updatedAt: '2024-01-16T10:00:00.000Z',
  },
  {
    id: '4',
    name: 'Ana Souza',
    document: '321.654.987-00',
    ageOrFoundationDate: '10/12/1993', // 30 anos
    monthlyIncome: 4000.0,
    balance: 2500.5,
    createdAt: '2024-01-18T10:00:00.000Z',
    updatedAt: '2024-01-18T10:00:00.000Z',
  },
  {
    id: '5',
    name: 'Carlos Pereira',
    document: '654.321.987-01',
    ageOrFoundationDate: '05/07/1978', // 45 anos
    monthlyIncome: 5000.0,
    balance: 8000.0,
    createdAt: '2024-01-19T10:00:00.000Z',
    updatedAt: '2024-01-19T10:00:00.000Z',
  },
  {
    id: '7',
    name: 'Lucas Martins',
    document: '147.258.369-00',
    ageOrFoundationDate: '30/11/1995', // 28 anos
    monthlyIncome: 2000.0,
    balance: 1000.0,
    createdAt: '2024-01-21T10:00:00.000Z',
    updatedAt: '2024-01-21T10:00:00.000Z',
  },
  {
    id: '8',
    name: 'Patrícia Lima',
    document: '951.753.846-00',
    ageOrFoundationDate: '18/04/1983', // 40 anos
    monthlyIncome: 3500.0,
    balance: 4500.0,
    createdAt: '2024-01-22T10:00:00.000Z',
    updatedAt: '2024-01-22T10:00:00.000Z',
  },
  {
    id: '10',
    name: 'Mariana Fernandes',
    document: '753.951.846-00',
    ageOrFoundationDate: '25/09/1988', // 35 anos
    monthlyIncome: 4200.0,
    balance: 3200.0,
    createdAt: '2024-01-24T10:00:00.000Z',
    updatedAt: '2024-01-24T10:00:00.000Z',
  },
  {
    id: '11',
    name: 'Roberto Santos',
    document: '456.789.123-00',
    ageOrFoundationDate: '12/01/1990', // 34 anos
    monthlyIncome: 3800.0,
    balance: 2200.0,
    createdAt: '2024-01-25T10:00:00.000Z',
    updatedAt: '2024-01-25T10:00:00.000Z',
  },
  {
    id: '12',
    name: 'Fernanda Costa',
    document: '852.963.741-00',
    ageOrFoundationDate: '03/06/1985', // 38 anos
    monthlyIncome: 4500.0,
    balance: 6700.0,
    createdAt: '2024-01-26T10:00:00.000Z',
    updatedAt: '2024-01-26T10:00:00.000Z',
  },

  // ✅ PESSOAS JURÍDICAS - com datas de fundação
  {
    id: '3',
    name: 'Empresa XPTO LTDA',
    document: '12.345.678/0001-99',
    ageOrFoundationDate: '15/05/2014', // Fundada há 10 anos
    monthlyIncome: 25000.0, // Receita mensal da empresa
    balance: 12000.0,
    createdAt: '2024-01-17T10:00:00.000Z',
    updatedAt: '2024-01-17T10:00:00.000Z',
  },
  {
    id: '6',
    name: 'Empresa ABC ME',
    document: '98.765.432/0001-11',
    ageOrFoundationDate: '10/03/2019', // Fundada há 5 anos
    monthlyIncome: 45000.0,
    balance: 30000.0,
    createdAt: '2024-01-20T10:00:00.000Z',
    updatedAt: '2024-01-20T10:00:00.000Z',
  },
  {
    id: '9',
    name: 'Empresa DEF LTDA',
    document: '23.456.789/0001-88',
    ageOrFoundationDate: '22/11/2016', // Fundada há 8 anos
    monthlyIncome: 35000.0,
    balance: 22000.0,
    createdAt: '2024-01-23T10:00:00.000Z',
    updatedAt: '2024-01-23T10:00:00.000Z',
  },
  {
    id: '13',
    name: 'Tech Solutions LTDA',
    document: '11.222.333/0001-44',
    ageOrFoundationDate: '08/07/2020', // Fundada há 4 anos
    monthlyIncome: 18000.0,
    balance: 15500.0,
    createdAt: '2024-01-27T10:00:00.000Z',
    updatedAt: '2024-01-27T10:00:00.000Z',
  },
  {
    id: '14',
    name: 'Comércio Brasil ME',
    document: '44.555.666/0001-77',
    ageOrFoundationDate: '30/01/2018', // Fundada há 6 anos
    monthlyIncome: 28000.0,
    balance: 18900.0,
    createdAt: '2024-01-28T10:00:00.000Z',
    updatedAt: '2024-01-28T10:00:00.000Z',
  },
];
