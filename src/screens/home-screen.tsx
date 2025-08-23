import { View, StyleSheet, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useState } from "react";
import { clientsMock } from "../mocks/clients-mock";
import { Client } from "../models/client";
import { ClientCard } from "../components/client-card";
import { Header } from "../components/header";
import { theme } from "../theme/theme";
import { removeAccents } from "../utils/utils";
import { useDebounce } from "../hooks/useDebounce";
import { Loading } from "../components/loading";
import { Button } from "../components/button";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setClients(clientsMock);
  }, [clientsMock]);

  const filteredClients = useMemo(() => {
    if (!debouncedSearch.trim()) {
      setIsSearching(false);
      return clients;
    }
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 400); // Simula o tempo de busca apenas coloquei para teste

    return clients.filter((client) => {
      const searchTerm = removeAccents(debouncedSearch.toLowerCase());
      const clientName = removeAccents(client.name.toLowerCase());
      return (
        clientName.includes(searchTerm) || client.document.includes(searchTerm)
      );
    });
  }, [debouncedSearch, clients]);

  useEffect(() => {
    if (search !== debouncedSearch && search.trim()) {
      setIsSearching(true);
    }
  }, [search, debouncedSearch]);

  const handleDeleteClient = (clientId: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  return (
    <View style={styles.container}>
      <Header title="Clientes" />
      <TextInput
        style={styles.search}
        placeholder="Buscar por nome ou CPF/CNPJ"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Cliente" icon="people" onPress={() => {}} variant="primary" />
        <Button title="Recarregar Lista" icon="refresh" onPress={() => {}} variant="secondary" />
      </View>
      {isSearching && <Loading />}
      <FlashList
        keyExtractor={(item) => item.id}
        data={filteredClients}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <ClientCard client={item} onPress={() => {}} onDelete={() => handleDeleteClient(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 12,
    margin: 10,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
