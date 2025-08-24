import { View , StyleSheet} from "react-native";
import { Header } from "../components/header";
import { ClientFormData } from "../schemas/client-schema";
import { ClientForm } from "../components/features/client-form";

export default function RegisterClientScreen() {
  const handleSubmit = (data: ClientFormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
     <Header title="Cadastrar Cliente" />
     <ClientForm onSubmit={handleSubmit} loading={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});