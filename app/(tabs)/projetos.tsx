import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, Text, View } from 'react-native';
import { Projeto, useClass } from '../../src/api';
import { useTheme } from '../../src/theme';
import { Card, Chip, Screen } from '../../src/ui';

export default function ProjetosScreen() {
  const { colors } = useTheme();
  const { data, loading, error, reload } = useClass<Projeto>('Projeto');
  return (
    <Screen loading={loading} error={error} onRefresh={reload}>
      {data.map(p => (
        <Card key={p.objectId}>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>{p.nome}</Text>
          <Text style={{ color: colors.text, lineHeight: 21 }}>{p.descricao}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {(p.tecnologias ?? []).map(t => <Chip key={t} label={t} />)}
          </View>
          {p.link ? (
            <Pressable onPress={() => Linking.openURL(p.link)} style={{ flexDirection: 'row', gap: 6, marginTop: 10, alignItems: 'center' }}>
              <Ionicons name="open-outline" size={16} color={colors.accent} />
              <Text style={{ color: colors.accent, fontWeight: '600' }}>Ver repositório</Text>
            </Pressable>
          ) : null}
        </Card>
      ))}
    </Screen>
  );
}
