export type TabParamList = {
  Clients: undefined;
  RegisterClients: undefined;
  Transfer: undefined;
};
export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
  EditClient: { clientId: string };
};

export type NavigationProps = BottomTabNavigationProp<TabParamList, 'Clients'>;
// Declaração global para o React Navigation
declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
