import { useMemo, useState } from 'react';

import { Client } from '../models/client';
import { removeAccents } from '../utils/utils';
import { useDebounce } from './useDebounce';

export const useClientSearch = (clients: Client[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredClients = useMemo(() => {
    if (!debouncedSearch.trim()) {
      setIsSearching(false);
      return clients;
    }
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);

    return clients.filter((client) => {
      const searchTerm = removeAccents(debouncedSearch.toLowerCase());
      const clientName = removeAccents(client.name.toLowerCase());

      return clientName.includes(searchTerm) || client.document.includes(searchTerm);
    });
  }, [debouncedSearch, clients]);

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    filteredClients,
  };
};
