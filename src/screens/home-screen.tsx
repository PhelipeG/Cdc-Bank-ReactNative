import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { ClientCard } from '../components/features/client-card';
import { Header } from '../components/layout/header';
import { ActionButtons } from '../components/screens/home/action-buttons';
import { ClientsList } from '../components/screens/home/clients-list';
import { LoadingView } from '../components/screens/home/loading-view';
import { SearchInput } from '../components/screens/home/search-input';
import { useClientActions } from '../hooks/useClientActions';
import { useClients } from '../hooks/useClients';
import { useClientSearch } from '../hooks/useClientSearch';
import { Client } from '../models/client';
import { theme } from '../theme/theme';

export default function HomeScreen() {
  const { clients, loading } = useClients();
  const { searchTerm, setSearchTerm, isSearching, filteredClients } = useClientSearch(clients);
  const {
    handleDeleteClient,
    handleEditClient,
    handleNavigateToCreateClient,
    handleReloadClients,
  } = useClientActions();

  const renderClientCard = useCallback(
    ({ item }: { item: Client }) => (
      <ClientCard
        client={item}
        onDelete={() => handleDeleteClient(item.id)}
        onEdit={() => handleEditClient(item.id)}
      />
    ),
    [handleDeleteClient, handleEditClient],
  );
  if (loading || isSearching) {
    return <LoadingView search={searchTerm} onSearchChange={setSearchTerm} title="Clientes" />;
  }

  return (
    <View style={styles.container}>
      <Header title="Clientes" />

      <SearchInput value={searchTerm} onChangeText={setSearchTerm} />

      <ActionButtons
        onAddClient={handleNavigateToCreateClient}
        onReloadClients={handleReloadClients}
        loading={loading}
      />

      <ClientsList
        data={filteredClients}
        renderItem={renderClientCard}
        onRefresh={handleReloadClients}
        refreshing={loading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: 50,
  },
});
