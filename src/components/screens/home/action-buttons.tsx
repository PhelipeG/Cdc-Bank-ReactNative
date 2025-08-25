import React from 'react';
import { StyleSheet,View } from 'react-native';

import { Button } from '../../button';



interface ActionButtonsProps {
  onAddClient: () => void;
  onReloadClients: () => void;
  loading?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onAddClient, 
  onReloadClients, 
  loading = false 
}) => (
  <View style={styles.container}>
    <Button
      title="Adicionar Cliente"
      icon="person-add"
      onPress={onAddClient}
      variant="primary"
      disabled={loading}
    />
    <Button
      title="Recarregar Lista"
      icon="refresh"
      onPress={onReloadClients}
      variant="secondary"
      disabled={loading}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    gap: 10, // Espaçamento entre botões
  },
});