import { useContext } from 'react';

import { ClientContext } from '../contexts/clientContext';

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients deve ser usado dentro de ClientsProvider');
  }
  return context;
};
