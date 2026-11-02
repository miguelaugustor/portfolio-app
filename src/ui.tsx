import { ReactNode } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from './theme';

export function Screen({ children, loading, error, onRefresh }: { children: ReactNode; loading?: boolean; error?: string | null; onRefresh?: () => void }) {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      refreshControl={onRefresh ? <RefreshControl refreshing={!!loading} onRefresh={onRefresh} tintColor={colors.accent} /> : undefined}>
      {loading ? <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /> : null}
      {error ? <Text style={{ color: '#E5484D', textAlign: 'center' }}>Não foi possível carregar os dados: {error}</Text> : null}
      {!loading && !error ? children : null}
    </ScrollView>
  );
}

export function Card({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>{children}</View>;
}

export function Chip({ label }: { label: string }) {
  const { colors } = useTheme();
  return (
    <View style={[s.chip, { backgroundColor: colors.accentSoft }]}>
      <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 18, padding: 18, borderWidth: 1, gap: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
});
