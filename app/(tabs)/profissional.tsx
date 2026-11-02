import { Text } from 'react-native';
import { Profissional, useClass } from '../../src/api';
import { useTheme } from '../../src/theme';
import { Card, Screen } from '../../src/ui';

export default function ProfissionalScreen() {
  const { colors } = useTheme();
  const { data, loading, error, reload } = useClass<Profissional>('Profissional', '-createdAt');
  return (
    <Screen loading={loading} error={error} onRefresh={reload}>
      {data.map(a => (
        <Card key={a.objectId}>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>{a.cargo}</Text>
          <Text style={{ color: colors.accent, fontWeight: '600' }}>{a.empresa}</Text>
          <Text style={{ color: colors.sub, fontSize: 12 }}>{a.periodo}</Text>
          <Text style={{ color: colors.text, marginTop: 6, lineHeight: 21 }}>{a.descricao}</Text>
        </Card>
      ))}
    </Screen>
  );
}
