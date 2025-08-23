import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { theme } from "../theme/theme";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { Button } from "../components/button";
import { Loading } from "../components/loading";
import { emailRegex } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";

const schema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Email inválido",
  }),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await login(data.email, data.password)
      .catch((err) => {
        Alert.alert("Erro", "Não foi possível realizar o login");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-main.jpg")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>CDC Bank - Parceiros</Text>
      <Input name="email" placeholder="Email" control={control} />

      <Input
        name="password"
        placeholder="Senha"
        control={control}
        secureTextEntry
      />
      {loading ? (
        <Loading />
      ) : (
        <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  title: {
    textAlign: "center",
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
  },
  errorMessage: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.sm,
  },
});
