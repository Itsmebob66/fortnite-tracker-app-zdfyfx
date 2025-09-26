
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PatchNote } from '../types/FortniteTypes';
import { commonStyles, colors } from '../styles/commonStyles';

interface PatchCardProps {
  patch: PatchNote;
  onPress: () => void;
}

const PatchCard: React.FC<PatchCardProps> = ({ patch, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weapons': return '⚔️';
      case 'items': return '🎒';
      case 'gameplay': return '🎮';
      case 'bug-fixes': return '🔧';
      case 'performance': return '⚡';
      case 'map': return '🗺️';
      default: return '📝';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={commonStyles.patchCard}>
      <View style={commonStyles.row}>
        <View style={commonStyles.badge}>
          <Text style={commonStyles.badgeText}>
            {patch.version}
          </Text>
        </View>
        <Text style={commonStyles.textSecondary}>
          {formatDate(patch.date)}
        </Text>
      </View>

      <Text style={[commonStyles.subtitle, { marginTop: 8, marginBottom: 8 }]}>
        {patch.title}
      </Text>

      <Text style={commonStyles.textSecondary} numberOfLines={2}>
        {patch.description}
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {patch.changes.slice(0, 3).map((change) => (
          <View
            key={change.id}
            style={{
              backgroundColor: colors.backgroundAlt,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              marginRight: 8,
              marginBottom: 4,
            }}
          >
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              {getCategoryIcon(change.category)} {change.category}
            </Text>
          </View>
        ))}
        {patch.changes.length > 3 && (
          <View
            style={{
              backgroundColor: colors.backgroundAlt,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              marginRight: 8,
              marginBottom: 4,
            }}
          >
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              +{patch.changes.length - 3} more
            </Text>
          </View>
        )}
      </View>

      {patch.size && (
        <Text style={[commonStyles.textSecondary, { marginTop: 8, fontSize: 12 }]}>
          📦 Size: {patch.size}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PatchCard;
