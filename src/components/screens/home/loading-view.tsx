import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../layout/header';
import { Loading } from '../../loading';
import { SearchInput } from './search-input';

interface LoadingViewProps {
  search: string;
  onSearchChange: (text: string) => void;
  title?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  search,
  onSearchChange,
  title = 'Clientes',
}) => (
  <View style={styles.container}>
    <Header title={title} />
    <SearchInput value={search} onChangeText={onSearchChange} />
    <Loading />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
