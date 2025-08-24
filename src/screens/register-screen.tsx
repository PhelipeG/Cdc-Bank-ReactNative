import { View, StyleSheet, Alert } from 'react-native';
import { Header } from '../components/header';
import { ClientFormData } from '../schemas/client-schema';
import { ClientForm } from '../components/features/client-form';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../@types/navigation';
import { useClients } from '../hooks/useClients';

type NavigationProps = BottomTabNavigationProp<TabParamList, 'Clients'>;

export default function RegisterClientScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { addClient , loading } = useClients();

  const handleCreateClient = async  (data: ClientFormData) => {
     try {
      await addClient(data);
      Alert.alert(
        'Sucesso!', 
        `Cliente ${data.name} cadastrado com sucesso!`,
        [
          {
            text: 'Ver Lista de Clientes',
            onPress: () => navigation.navigate('Clients'),
          },
          {
            text: 'Cadastrar Novo Cliente',
            style: 'cancel',
          }
        ]
      );
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert(
        'Erro', 
        'Não foi possível cadastrar o cliente. Tente novamente.',
        [{ text: 'OK' }]
      );
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cadastrar Cliente" />
      <ClientForm onSubmit={handleCreateClient} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
