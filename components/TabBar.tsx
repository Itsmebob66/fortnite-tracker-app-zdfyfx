
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'patches', label: 'Patches', icon: '🔄' },
    { id: 'modes', label: 'Modes', icon: '🎮' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text
            style={[
              styles.label,
              activeTab === tab.id && styles.activeLabel
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  icon: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeLabel: {
    color: colors.background,
  },
});

export default TabBar;
