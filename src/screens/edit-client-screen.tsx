import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

import { RootStackParamList } from '../@types/navigation';
import { Header } from '../components/header';

type EditClientRouteProp = RouteProp<RootStackParamList, 'EditClient'>;

export default function EditClientScreen() {
  // const navigation = useNavigation();
  const route = useRoute<EditClientRouteProp>();
  const { clientId } = route.params;
  return (
    <View>
      <Header title="Editar Cliente" />
      <Text>Editar Cliente ID: {clientId}</Text>
    </View>
  );
}
