import {
  formatDateInput,
  formatDocumentInput,
  formatToBRL,
  isCNPJ,
  isValidDate,
  removeAccents,
} from '../../utils/utils';

const normalizeCurrency = (s: string) => s.replace(/\u00A0/g, ' ');

describe('Testando funções utilitárias', () => {
  it('deve formatar numero para BRL', () => {
    const result = normalizeCurrency(formatToBRL(1005));
    console.log(result);
    expect(result).toBe('R$ 1.005,00');
  });

  it('remove acentos corretamente', () => {
    expect(removeAccents('Olá, ação, João, cachaça')).toBe('Ola, acao, Joao, cachaca');
    expect(removeAccents('ÇÊ Á à ï Ü')).toBe('CE A a i U');
  });
});

describe('testando função formatDocumentInput', () => {
  it('formata CPF (11 dígitos) como 000.000.000-00', () => {
    expect(formatDocumentInput('12345678901')).toBe('123.456.789-01');
  });

  it('mantém formato de CPF mesmo com caracteres não numéricos', () => {
    expect(formatDocumentInput('123.456.789-01')).toBe('123.456.789-01');
  });

  it('formata CNPJ (14 dígitos) como 00.000.000/0000-00', () => {
    expect(formatDocumentInput('12345678000199')).toBe('12.345.678/0001-99');
  });
});

describe('isCNPJ', () => {
  it('retorna true para 14 dígitos, mesmo com máscara', () => {
    expect(isCNPJ('12345678000199')).toBe(true);
    expect(isCNPJ('12.345.678/0001-99')).toBe(true);
  });

  it('retorna false para tamanhos diferentes de 14', () => {
    expect(isCNPJ('123')).toBe(false);
    expect(isCNPJ('1234567890123')).toBe(false);
    expect(isCNPJ('123456789012345')).toBe(false);
  });
});
describe('testando isValidDate', () => {
  const currentYear = new Date().getFullYear();

  it('valida datas corretas', () => {
    expect(isValidDate('01/01/1900')).toBe(true);
    expect(isValidDate(`31/12/${currentYear}`)).toBe(true);
    expect(isValidDate('29/02/2024')).toBe(true); // ano bissexto
  });

  it('rejeita formatos inválidos', () => {
    expect(isValidDate('2024-12-31')).toBe(false);
    expect(isValidDate('31-12-2024')).toBe(false);
    expect(isValidDate('31/12/24')).toBe(false);
  });

  it('rejeita datas impossíveis', () => {
    expect(isValidDate('32/01/2024')).toBe(false);
    expect(isValidDate('31/04/2024')).toBe(false); // abril tem 30
    expect(isValidDate('29/02/2023')).toBe(false); // não bissexto
  });
});
describe('testando a funçao formatDateInput', () => {
  it('aplica máscara de data progressiva DD/MM/AAAA', () => {
    expect(formatDateInput('1')).toBe('1');
    expect(formatDateInput('1212')).toBe('12/12');
    expect(formatDateInput('12122024')).toBe('12/12/2024');
  });

  it('remove não dígitos e re-formata corretamente', () => {
    expect(formatDateInput('12/12/2024')).toBe('12/12/2024');
  });
});
