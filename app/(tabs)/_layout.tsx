import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../src/theme';

const tab = (title: string, icon: keyof typeof Ionicons.glyphMap) => ({
  title,
  tabBarIcon: ({ color, size }: { color: string; size: number }) => <Ionicons name={icon} size={size} color={color} />,
});

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.sub,
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
      headerShadowVisible: false,
    }}>
      <Tabs.Screen name="index" options={tab('Home', 'home')} />
      <Tabs.Screen name="academica" options={tab('Acadêmica', 'school')} />
      <Tabs.Screen name="profissional" options={tab('Profissional', 'briefcase')} />
      <Tabs.Screen name="projetos" options={tab('Projetos', 'code-slash')} />
      <Tabs.Screen name="sobre" options={tab('Sobre', 'information-circle')} />
    </Tabs>
  );
}
