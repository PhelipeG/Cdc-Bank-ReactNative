import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { RefreshControl } from 'react-native';

import { Client } from '../../../models/client';

interface ClientsListProps {
  data: Client[];
  renderItem: ListRenderItem<Client>;
  onRefresh: () => void;
  refreshing: boolean;
  estimatedItemSize?: number;
  showsVerticalScrollIndicator?: boolean;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  data,
  renderItem,
  onRefresh,
  refreshing,
  estimatedItemSize = 120,
  showsVerticalScrollIndicator = false,
}) => (
  <FlashList
    keyExtractor={(item) => item.id}
    data={data}
    estimatedItemSize={estimatedItemSize}
    renderItem={renderItem}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  />
);