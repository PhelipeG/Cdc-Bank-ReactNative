import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../@types/navigation';
import { ClientForm } from '../components/features/client-form';
import { Header } from '../components/layout/header';
import { Loading } from '../components/loading';
import { useClients } from '../hooks/useClients';
import { ClientFormData } from '../schemas/client-schema';
import { formatToBRL } from '../utils/utils';

type EditClientRouteProp = RouteProp<RootStackParamList, 'EditClient'>;

export default function EditClientScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditClientRouteProp>();
  const { clientId } = route.params;
  const { clients, updateClient, loading } = useClients();
  const [client, setClient] = useState(() => clients.find((item) => item.id === clientId));

  useEffect(() => {
    const updatedClient = clients.find((item) => item.id === clientId);
    setClient(updatedClient);
  }, [clients, clientId]);

  const handleUpdateClient = async (data: ClientFormData): Promise<void> => {
    try {
      await updateClient(clientId, data);

      Alert.alert('Sucesso!', `Cliente ${data.name} foi atualizado com sucesso!`, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o cliente. Tente novamente.', [
        { text: 'OK' },
      ]);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Editar Cliente" />
      <ClientForm
        onSubmit={handleUpdateClient}
        loading={loading}
        isEditing={true}
        initialData={{
          name: client?.name,
          document: client?.document,
          ageOrFoundationDate: client?.ageOrFoundationDate,
          monthlyIncome: client?.monthlyIncome ? formatToBRL(client.monthlyIncome) : undefined,
        }}
      />
      {loading && <Loading />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
