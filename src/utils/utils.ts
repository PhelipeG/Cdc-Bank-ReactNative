/** 
 * Expressões regulares para validação de dados
**/
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

/**
 * Formata um valor numérico para  a nossa moeda brasileira (BRL)
 * @param value - Valor a ser formatado recebido 
 * @returns retorna a String formatada em BRL
 * @example exemplo : formatToBRL(1234.56) // "R$ 1.234,56"
 */
export function formatToBRL(value: number | string): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
/**
 * Remove acentos de uma string melhor para pesquisar os textos e se tiver acento aparece tambem 
 * @param text - Texto a ser processado
 * @returns - Texto sem acentos usando o normalize
 */
export function removeAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
/**
 * Formata CPF ou CNPJ automaticamente
 * @param value - Valor do documento
 * @returns Documento formatado
 */
export function formatDocumentInput(value: string): string {
  const numericValue = value.replace(/\D/g, '');
  
  if (numericValue.length <= 11) {
    // CPF: 000.000.000-00
    return numericValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  } else {
    // CNPJ: 00.000.000/0000-00
    return numericValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2');
  }
}
/**
 * Formata data no padrão DD/MM/AAAA
 * @param value - Valor da data
 * @returns Data formatada
 */
export function formatDateInput(value: string): string {
  const numericValue = value.replace(/\D/g, '');
  if (numericValue.length <= 2) return numericValue;
  if (numericValue.length <= 4) return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
  return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
}
export function formatCurrencyInput(value: string): string {
  const numericValue = value.replace(/[^\d]/g, '');
  const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `R$ ${formattedValue}`;
}
/**
 * Verifica se o documento é CNPJ
 * @param document - Documento a ser verificado
 * @returns true se for CNPJ
 */
export function isCNPJ(document: string): boolean {
  return cnpjRegex.test(document);
}