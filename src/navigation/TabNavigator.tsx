import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import TrainingPlanScreen from '../screens/training/TrainingPlanScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import KnowledgeScreen from '../screens/knowledge/KnowledgeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Training': iconName = focused ? 'fitness' : 'fitness-outline'; break;
            case 'Progress': iconName = focused ? 'stats-chart' : 'stats-chart-outline'; break;
            case 'Knowledge': iconName = focused ? 'book' : 'book-outline'; break;
            case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
            default: iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 60, paddingBottom: 8, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
      <Tab.Screen name="Training" component={TrainingPlanScreen} options={{ title: '计划' }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ title: '进度' }} />
      <Tab.Screen name="Knowledge" component={KnowledgeScreen} options={{ title: '知识' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '我的' }} />
    </Tab.Navigator>
  );
};
