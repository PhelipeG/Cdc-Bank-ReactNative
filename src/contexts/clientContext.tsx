import React, { createContext, useEffect, useState } from 'react';

import { clientsMock } from '../mocks/clients-mock';
import { Client } from '../models/client';
import { ClientFormData } from '../schemas/client-schema';

interface ClientContextType {
  clients: Client[];
  loading: boolean;
  addClient: (data: ClientFormData) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  reloadClients: () => Promise<void>;
  updateClient: (id: string, data: ClientFormData) => Promise<void>;
}

export const ClientContext = createContext<ClientContextType>({} as ClientContextType);

export const ClientsProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInitialDataClients = () => {
    const sortedClients = [...clientsMock].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setClients(sortedClients);
  };

  useEffect(() => {
    loadInitialDataClients();
  }, []);

  const reloadClients = async (): Promise<void> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      loadInitialDataClients();
    } catch (error) {
      console.error('Erro ao recarregar clientes:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (data: ClientFormData): Promise<void> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const now = new Date().toISOString();

      const newClient: Client = {
        id: Date.now().toString(),
        name: data.name,
        document: data.document,
        ageOrFoundationDate: data.ageOrFoundationDate,
        monthlyIncome: parseFloat(data.monthlyIncome.replace(/[^\d,]/g, '').replace(',', '.')),
        balance: 0,
        createdAt: now,
        updatedAt: now,
      };

      setClients((prev) => [newClient, ...prev]);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string): Promise<void> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300)); // simula API
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    } finally {
      setLoading(false);
    }
  };
  const updateClient = async (id: string, data: ClientFormData): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const now = new Date().toISOString();
      setClients((prev) => {
        return prev.map((client) => {
          if (client.id === id) {
            return {
              ...client,
              name: data.name,
              ageOrFoundationDate: data.ageOrFoundationDate,
              monthlyIncome: parseFloat(
                data.monthlyIncome.replace(/[^\d,]/g, '').replace(',', '.'),
              ),
              updatedAt: now,
            };
          }
          return client;
        });
      });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        loading,
        addClient,
        deleteClient,
        reloadClients,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
