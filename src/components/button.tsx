import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const Button = ({ 
  title, 
  onPress, 
  icon, 
  iconPosition = 'left',
  variant = 'primary',
  disabled = false 
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.primary };
      case 'danger':
        return { backgroundColor: theme.colors.danger };
      default:
        return { backgroundColor: theme.colors.primary };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.primary;
      default:
        return theme.colors.textLight;
    }
  };

  const renderContent = () => {
    if (!icon) {
      return <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>;
    }

    const iconElement = (
      <MaterialIcons 
        name={icon} 
        size={20} 
        color={getTextColor()} 
        style={styles.icon}
      />
    );

    const textElement = (
      <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
    );

    return (
      <View style={styles.content}>
        {iconPosition === 'left' ? (
          <>
            {iconElement}
            {textElement}
          </>
        ) : (
          <>
            {textElement}
            {iconElement}
          </>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        getButtonStyle(),
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.6,
  },
});