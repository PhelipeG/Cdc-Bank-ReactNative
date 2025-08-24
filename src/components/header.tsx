import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../hooks/useAuth';
import { theme } from '../theme/theme';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval); // limpando intervalo
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };
  const handleLogout = () => {
    Alert.alert('Confirmar Saída', 'Você tem certeza que deseja sair da sessão?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair da Sessão',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.topRow}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user}
          </Text>
          <Text style={styles.time}>⏰ {currentTime}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 14,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 12,
  },
});
