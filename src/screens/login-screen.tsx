import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Logo from '../../assets/logo-main.jpg';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Loading } from '../components/loading';
import { useAuth } from '../hooks/useAuth';
import { LoginFormData, loginSchema } from '../schemas/login-schema';
import { theme } from '../theme/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    await login(data.email, data.password)
      .catch((err) => {
        Alert.alert('Erro', 'Não foi possível realizar o login');
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LinearGradient
      colors={['#1a365d', '#2d5a87', '#3182ce']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} />
              </View>
              <Text style={styles.title}>CDC Bank</Text>
              <Text style={styles.subtitle}>Portal de Parceiros</Text>
            </View>
            <View style={styles.loginCard}>
              <Text style={styles.loginTitle}>Acesse sua conta</Text>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Digite seu email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                    />
                  )}
                />
                {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Digite sua senha"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      returnKeyType="done"
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorMessage}>{errors.password.message}</Text>
                )}
              </View>

              <View style={styles.buttonContainer}>
                {loading ? (
                  <Loading />
                ) : (
                  <Button title="Entrar" onPress={handleSubmit(onSubmit)} disabled={loading} />
                )}
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>CDC Bank © 2024</Text>
              <Text style={styles.footerSubtext}>
                Segurança e confiabilidade para seus negócios
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '300',
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: theme.spacing.lg,
    borderRadius: 24,
    padding: 32,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
  errorMessage: {
    color: '#E53E3E',
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: theme.spacing.lg,
    marginTop: 'auto',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '300',
  },
});
