import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { Alert,Image, StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <Image
        source={Logo}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>CDC Bank - Parceiros</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input placeholder="Email" value={value} onChangeText={onChange} />
        )}
      />
      {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input placeholder="Senha" value={value} onChangeText={onChange} secureTextEntry />
        )}
      />
      {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}

      {loading ? (
        <Loading />
      ) : (
        <Button title="Entrar" onPress={handleSubmit(onSubmit)} disabled={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  errorMessage: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.sm,
  },
});
