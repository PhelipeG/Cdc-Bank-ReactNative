import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Client } from '../../../models/client';
import { theme } from '../../../theme/theme';
import { formatToBRL } from '../../../utils/utils';

interface ClientPickerProps {
  label: string;
  placeholder: string;
  clients: Client[];
  selectedClientId: string;
  onSelect: (clientId: string) => void;
  enabled?: boolean;
  showBalance?: boolean;
  selectedClient?: Client;
}

export const ClientPicker: React.FC<ClientPickerProps> = ({
  label,
  placeholder,
  clients = [],
  selectedClientId,
  onSelect,
  enabled = true,
  showBalance = false,
  selectedClient,
}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.pickerContainer, !enabled && styles.disabled]}>
        <Picker
          style={styles.picker}
          selectedValue={selectedClientId}
          onValueChange={onSelect}
          enabled={enabled}
        >
          <Picker.Item label={placeholder} value="" />
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <Picker.Item
                key={client.id}
                label={
                  showBalance ? `${client.name} - ${formatToBRL(client.balance)}` : client.name
                }
                value={client.id}
              />
            ))
          ) : (
            <Picker.Item label="Nenhum cliente disponível" value="" enabled={false} />
          )}
        </Picker>
      </View>

      {selectedClient && showBalance && (
        <Text style={styles.balance}>
          💰 Saldo Disponível: {formatToBRL(selectedClient.balance)}
        </Text>
      )}

      {selectedClient && !showBalance && (
        <Text style={styles.destinationInfo}>📥 Destino: {selectedClient.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.textDark,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  disabled: {
    opacity: 0.6,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
  },
  balance: {
    marginTop: 8,
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: 'bold',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 8,
    borderRadius: 6,
  },
  destinationInfo: {
    marginTop: 8,
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    padding: 8,
    borderRadius: 6,
  },
});
