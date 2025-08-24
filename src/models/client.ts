export interface Client {
  id: string;
  name: string;
  document: string;
  ageOrFoundationDate: string;
  monthlyIncome: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
export interface CreateClientData {
  id: string;
  name: string;
  document: string;
  ageOrFoundationDate: string;
  monthlyIncome: number;
}
export interface TransferData {
  fromClientId: string;
  toClientId: string;
  amount: number;
}
