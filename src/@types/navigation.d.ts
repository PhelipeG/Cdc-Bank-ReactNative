// Tipos das Tabs
export type TabParamList = {
  Clients: undefined;
  RegisterClients: undefined;
};

// Tipos do Stack Principal
export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
};

// Declaração global para o React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
