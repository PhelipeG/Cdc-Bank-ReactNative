import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';
import { Alert } from 'react-native';

import { RootStackParamList, TabParamList } from '../@types/navigation';
import { useClients } from './useClients';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Clients'>,
  StackNavigationProp<RootStackParamList>
>;

export const useClientActions = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { deleteClient, reloadClients } = useClients();

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
      navigation.navigate('EditClient', { clientId });
    },
    [navigation],
  );

  const handleNavigateToCreateClient = useCallback(() => {
    navigation.navigate('RegisterClients');
  }, [navigation]);

  const handleReloadClients = useCallback(async () => {
    try {
      await reloadClients();
      Alert.alert('Info', 'Lista recarregada!');
    } catch (error) {
      console.error('Erro ao recarregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível recarregar a lista');
    }
  }, [reloadClients]);

  return {
    handleDeleteClient,
    handleEditClient,
    handleNavigateToCreateClient,
    handleReloadClients,
  };
};