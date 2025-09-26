
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GameMode } from '../types/FortniteTypes';
import { commonStyles, colors } from '../styles/commonStyles';

interface GameModeCardProps {
  gameMode: GameMode;
  onPress: () => void;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ gameMode, onPress }) => {
  const isLimitedTime = gameMode.startDate && gameMode.endDate;
  
  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={commonStyles.card}>
      {gameMode.image && (
        <Image
          source={{ uri: gameMode.image }}
          style={{
            width: '100%',
            height: 80,
            borderRadius: 8,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}
      
      <View style={commonStyles.row}>
        <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
          {gameMode.name}
        </Text>
        <View
          style={[
            commonStyles.badge,
            {
              backgroundColor: gameMode.isActive ? colors.success : colors.grey,
            }
          ]}
        >
          <Text style={commonStyles.badgeText}>
            {gameMode.isActive ? 'ACTIVE' : 'INACTIVE'}
          </Text>
        </View>
      </View>

      <Text style={commonStyles.textSecondary} numberOfLines={2}>
        {gameMode.description}
      </Text>

      {isLimitedTime && gameMode.endDate && (
        <Text style={[commonStyles.textSecondary, { marginTop: 8, fontSize: 12 }]}>
          ⏰ Ends: {formatEndDate(gameMode.endDate)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default GameModeCard;
