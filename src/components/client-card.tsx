import { Client } from "../models/client";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { formatToBRL } from "../utils/utils";
import { theme } from "../theme/theme";

interface ClientCardProps {
  client: Client;
  onPress?: () => void;
  onDelete: (clientId: string) => void;
}

export const ClientCard = ({ client, onPress, onDelete }: ClientCardProps) => {
   const handleDelete = () => {
    Alert.alert(
      "Excluir Cliente",
      `Tem certeza que deseja excluir ${client.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete?.(client.id),
        },
      ]
    );
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="people" size={32} color="#1976D2" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{client.name}</Text>
          <Text style={styles.doc}>{client.document}</Text>
        </View>
         <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={20} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <MaterialIcons name="attach-money" size={20} color={theme.colors.success} />
        <Text style={styles.balance}>Saldo: {formatToBRL(client.balance)}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 16,
    marginBottom: 16,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    padding: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.textDark,
  },
  doc: {
    fontSize: 14,
    color: theme.colors.textDark,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    fontSize: 15,
    marginTop: 4,
    color: theme.colors.success,
    fontWeight: "bold",
  },
});
