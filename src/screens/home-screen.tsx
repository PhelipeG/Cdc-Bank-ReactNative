import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert,StyleSheet, TextInput, View } from 'react-native';

import { RootStackParamList, TabParamList } from '../@types/navigation';
import { Button } from '../components/button';
import { ClientCard } from '../components/features/client-card';
import { Header } from '../components/header';
import { Loading } from '../components/loading';
import { useClients } from '../hooks/useClients';
import { useDebounce } from '../hooks/useDebounce';
import { Client } from '../models/client';
import { theme } from '../theme/theme';
import { removeAccents } from '../utils/utils';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Clients'>,
  StackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(search, 400);
  const navigate = useNavigation<HomeScreenNavigationProp>();

  const { clients, loading, deleteClient, reloadClients } = useClients();

  const handleDeleteClient = useCallback(
    async (clientId: string) => {
      Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este cliente?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteClient(clientId);
              Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              Alert.alert('Erro', 'Não foi possível excluir o cliente');
            }
          },
        },
      ]);
    },
    [deleteClient],
  );

  const handleEditClient = useCallback(
    (clientId: string) => {
      navigate.navigate('EditClient', { clientId });
    },
    [navigate],
  );

  const handleNavigateToCreateClient = useCallback(() => {
    navigate.navigate('RegisterClients');
  }, [navigate]);

  const handleReloadClients = useCallback(async () => {
    try {
      await reloadClients();
      Alert.alert('Info', 'Lista recarregada!');
      setSearch('');
    } catch (error) {
      console.error('Erro ao recarregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível recarregar a lista de clientes');
    }
  }, [reloadClients]);

  const renderClientCard = useCallback(
    ({ item }: { item: Client }) => {
      return (
        <ClientCard
          client={item}
          onDelete={() => handleDeleteClient(item.id)}
          onEdit={() => handleEditClient(item.id)}
        />
      );
    },
    [handleDeleteClient, handleEditClient],
  );

  const filteredClients = useMemo(() => {
    if (!debouncedSearch.trim()) {
      setIsSearching(false);
      return clients;
    }
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 400);

    return clients.filter((client) => {
      const searchTerm = removeAccents(debouncedSearch.toLowerCase());
      const clientName = removeAccents(client.name.toLowerCase());
      return clientName.includes(searchTerm) || client.document.includes(searchTerm);
    });
  }, [debouncedSearch, clients]);

  useEffect(() => {
    if (search !== debouncedSearch && search.trim()) {
      setIsSearching(true);
    }
  }, [search, debouncedSearch]);

  if (loading || isSearching) {
    return (
      <View style={styles.container}>
        <Header title="Clientes" />
        <TextInput
          style={styles.search}
          placeholder="Buscar por nome ou CPF/CNPJ"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Clientes" />
      <TextInput
        style={styles.search}
        placeholder="Buscar por nome ou CPF/CNPJ"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Cliente"
          icon="person-add"
          onPress={handleNavigateToCreateClient}
          variant="primary"
        />
        <Button
          title="Recarregar Lista"
          icon="refresh"
          onPress={handleReloadClients}
          variant="secondary"
        />
      </View>

      <FlashList
        keyExtractor={(item) => item.id}
        data={filteredClients}
        estimatedItemSize={120}
        renderItem={renderClientCard}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 12,
    margin: 10,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});
