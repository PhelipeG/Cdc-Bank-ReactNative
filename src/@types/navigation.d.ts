export type TabParamList = {
  Clients: undefined;
  RegisterClients: undefined;
};
export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
};

// Declaração global para o React Navigation
declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
