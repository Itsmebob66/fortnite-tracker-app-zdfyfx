
import React, { useState } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockNews, mockPatchNotes, mockGameModes } from '../data/mockData';
import { FortniteNews, PatchNote, GameMode } from '../types/FortniteTypes';
import NewsCard from '../components/NewsCard';
import PatchCard from '../components/PatchCard';
import GameModeCard from '../components/GameModeCard';
import TabBar from '../components/TabBar';
import SimpleBottomSheet from '../components/BottomSheet';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('news');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FortniteNews | PatchNote | GameMode | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  console.log('MainScreen rendered with activeTab:', activeTab);

  const onRefresh = async () => {
    console.log('Refreshing data...');
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      console.log('Data refreshed');
    }, 1000);
  };

  const handleItemPress = (item: FortniteNews | PatchNote | GameMode) => {
    console.log('Item pressed:', item.id);
    setSelectedItem(item);
    setIsBottomSheetVisible(true);
  };

  const renderNewsContent = () => (
    <View>
      <Text style={[commonStyles.title, { marginBottom: 20 }]}>
        🎮 Fortnite Updates
      </Text>
      {mockNews.map((news) => (
        <NewsCard
          key={news.id}
          news={news}
          onPress={() => handleItemPress(news)}
        />
      ))}
    </View>
  );

  const renderPatchesContent = () => (
    <View>
      <Text style={[commonStyles.title, { marginBottom: 20 }]}>
        🔄 Patch Notes
      </Text>
      {mockPatchNotes.map((patch) => (
        <PatchCard
          key={patch.id}
          patch={patch}
          onPress={() => handleItemPress(patch)}
        />
      ))}
    </View>
  );

  const renderModesContent = () => (
    <View>
      <Text style={[commonStyles.title, { marginBottom: 20 }]}>
        🎮 Game Modes
      </Text>
      {mockGameModes.map((mode) => (
        <GameModeCard
          key={mode.id}
          gameMode={mode}
          onPress={() => handleItemPress(mode)}
        />
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return renderNewsContent();
      case 'patches':
        return renderPatchesContent();
      case 'modes':
        return renderModesContent();
      default:
        return renderNewsContent();
    }
  };

  const renderBottomSheetContent = () => {
    if (!selectedItem) return null;

    if ('body' in selectedItem) {
      // News item
      const news = selectedItem as FortniteNews;
      return (
        <ScrollView style={{ flex: 1 }}>
          <Text style={[commonStyles.title, { marginBottom: 16 }]}>
            {news.title}
          </Text>
          <View style={[commonStyles.badge, { marginBottom: 16 }]}>
            <Text style={commonStyles.badgeText}>
              {news.type.toUpperCase()} • {news.priority.toUpperCase()}
            </Text>
          </View>
          <Text style={[commonStyles.text, { lineHeight: 24 }]}>
            {news.body}
          </Text>
          <Text style={[commonStyles.textSecondary, { marginTop: 16 }]}>
            Published: {new Date(news.date).toLocaleString()}
          </Text>
        </ScrollView>
      );
    } else if ('version' in selectedItem) {
      // Patch note
      const patch = selectedItem as PatchNote;
      return (
        <ScrollView style={{ flex: 1 }}>
          <Text style={[commonStyles.title, { marginBottom: 8 }]}>
            {patch.title}
          </Text>
          <Text style={[commonStyles.subtitle, { marginBottom: 16, color: colors.primary }]}>
            Version {patch.version}
          </Text>
          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            {patch.description}
          </Text>
          
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
            Changes:
          </Text>
          {patch.changes.map((change) => (
            <View key={change.id} style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={commonStyles.row}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {change.title}
                </Text>
                <View style={[commonStyles.badge, { backgroundColor: colors.accent }]}>
                  <Text style={commonStyles.badgeText}>
                    {change.type.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                {change.description}
              </Text>
            </View>
          ))}
          
          <Text style={[commonStyles.textSecondary, { marginTop: 16 }]}>
            Released: {new Date(patch.date).toLocaleString()}
            {patch.size && ` • Size: ${patch.size}`}
          </Text>
        </ScrollView>
      );
    } else {
      // Game mode
      const mode = selectedItem as GameMode;
      return (
        <ScrollView style={{ flex: 1 }}>
          <Text style={[commonStyles.title, { marginBottom: 16 }]}>
            {mode.name}
          </Text>
          <View style={[commonStyles.badge, { 
            backgroundColor: mode.isActive ? colors.success : colors.grey,
            marginBottom: 16 
          }]}>
            <Text style={commonStyles.badgeText}>
              {mode.isActive ? 'ACTIVE' : 'INACTIVE'}
            </Text>
          </View>
          <Text style={[commonStyles.text, { lineHeight: 24 }]}>
            {mode.description}
          </Text>
          {mode.startDate && mode.endDate && (
            <View style={{ marginTop: 20 }}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                Event Period:
              </Text>
              <Text style={commonStyles.text}>
                {new Date(mode.startDate).toLocaleDateString()} - {new Date(mode.endDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      
      <ScrollView
        style={commonStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
        <View style={{ height: 40 }} />
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => {
          setIsBottomSheetVisible(false);
          setSelectedItem(null);
        }}
      >
        {renderBottomSheetContent()}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
