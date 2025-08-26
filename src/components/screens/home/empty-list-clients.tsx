import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../../theme/theme';

interface EmptyClientsProps {
  onCreateClient?: () => void;
}

export const EmptyClients: React.FC<EmptyClientsProps> = ({ onCreateClient }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="people-outline" size={80} color={theme.colors.primary} />
      </View>

      <Text style={styles.title}>Nenhum cliente cadastrado</Text>
      <Text style={styles.message}>
        Você ainda não possui clientes cadastrados.{'\n'}
        Que tal adicionar o primeiro?
      </Text>

      {onCreateClient && (
        <TouchableOpacity style={styles.button} onPress={onCreateClient} activeOpacity={0.7}>
          <MaterialIcons name="person-add" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Cadastrar Primeiro Cliente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 300,
  },
  iconContainer: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 60,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textDark || '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: theme.colors.textLight || '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary || '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});
