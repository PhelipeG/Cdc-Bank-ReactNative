import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Client } from '../../models/client';
import { theme } from '../../theme/theme';
import { formatToBRL } from '../../utils/utils';

interface ClientCardProps {
  client: Client;
  onDelete: () => void;
  onEdit?: () => void;
}

export const ClientCard = ({ client, onDelete, onEdit }: ClientCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={32} color="#1976D2" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{client.name}</Text>
          <Text style={styles.doc}>{client.document}</Text>
        </View>
        <View style={styles.buttonActions}>
          <TouchableOpacity onPress={onEdit}>
            <MaterialIcons name="edit" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={20} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 16,
    marginBottom: 16,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    padding: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  doc: {
    fontSize: 14,
    color: theme.colors.textDark,
    marginTop: 2,
  },
  buttonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    fontSize: 15,
    marginTop: 4,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
});
