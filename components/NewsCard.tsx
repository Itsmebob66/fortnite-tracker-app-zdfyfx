
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FortniteNews } from '../types/FortniteTypes';
import { commonStyles, colors } from '../styles/commonStyles';

interface NewsCardProps {
  news: FortniteNews;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.grey;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'update': return '🔄';
      case 'event': return '🎉';
      case 'news': return '📰';
      default: return '📢';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={commonStyles.newsCard}>
      {news.image && (
        <Image
          source={{ uri: news.image }}
          style={{
            width: '100%',
            height: 120,
            borderRadius: 8,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}
      
      <View style={commonStyles.row}>
        <View style={[commonStyles.badge, { backgroundColor: getPriorityColor(news.priority) }]}>
          <Text style={commonStyles.badgeText}>
            {getTypeIcon(news.type)} {news.type.toUpperCase()}
          </Text>
        </View>
        <Text style={commonStyles.textSecondary}>
          {formatDate(news.date)}
        </Text>
      </View>

      <Text style={[commonStyles.subtitle, { marginTop: 8, marginBottom: 8 }]}>
        {news.title}
      </Text>

      <Text style={commonStyles.textSecondary} numberOfLines={3}>
        {news.body}
      </Text>
    </TouchableOpacity>
  );
};

export default NewsCard;
