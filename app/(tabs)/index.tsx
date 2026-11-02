import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { Profile, useClass } from '../../src/api';
import { exportarCurriculo } from '../../src/pdf';
import { useTheme } from '../../src/theme';
import { Card, Screen } from '../../src/ui';

export default function Home() {
  const { colors } = useTheme();
  const { data, loading, error, reload } = useClass<Profile>('Profile');
  const [busy, setBusy] = useState(false);
  const me = data[0];

  const exportar = async () => {
    try {
      setBusy(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await exportarCurriculo();
    } catch (e: any) {
      Alert.alert('Erro ao gerar PDF', e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen loading={loading} error={error} onRefresh={reload}>
      {me && (
        <>
          <View style={{ alignItems: 'center', gap: 8, paddingVertical: 16 }}>
            <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 40, fontWeight: '800' }}>{me.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}</Text>
            </View>
            <Text style={{ color: colors.text, fontSize: 26, fontWeight: '800', textAlign: 'center' }}>{me.nome}</Text>
            <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '600' }}>{me.titulo}</Text>
            <Text style={{ color: colors.sub }}>{me.cidade}</Text>
          </View>
          <Card><Text style={{ color: colors.text, lineHeight: 22 }}>{me.bio}</Text></Card>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL(`https://github.com/${me.github}`)}>
              <Card><Ionicons name="logo-github" size={24} color={colors.text} /><Text style={{ color: colors.text, fontWeight: '600' }}>GitHub</Text></Card>
            </Pressable>
            <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL(`mailto:${me.email}`)}>
              <Card><Ionicons name="mail" size={24} color={colors.text} /><Text style={{ color: colors.text, fontWeight: '600' }}>E-mail</Text></Card>
            </Pressable>
          </View>
          <Pressable onPress={exportar} disabled={busy}
            style={{ backgroundColor: colors.accent, padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', gap: 10, opacity: busy ? 0.6 : 1 }}>
            <Ionicons name="document-text" size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{busy ? 'Gerando PDF...' : 'Exportar currículo em PDF'}</Text>
          </Pressable>
        </>
      )}
    </Screen>
  );
}
