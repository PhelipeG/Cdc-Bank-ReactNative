/** 
 * Expressões regulares para validação de dados
**/
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
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