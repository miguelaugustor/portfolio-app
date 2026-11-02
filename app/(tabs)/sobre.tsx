import { Pressable, Switch, Text, View } from 'react-native';
import { useTheme } from '../../src/theme';
import { Card, Chip, Screen } from '../../src/ui';

const techs = [
  'React Native', 'Expo SDK', 'Expo Router', 'TypeScript', 'Back4App (Parse REST API)',
  'expo-print', 'expo-sharing', 'expo-haptics', 'AsyncStorage', '@expo/vector-icons', 'EAS Update',
];

export default function Sobre() {
  const { colors, isDark, toggle } = useTheme();
  return (
    <Screen>
      <Card>
        <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>Sobre este app</Text>
        <Text style={{ color: colors.text, lineHeight: 21 }}>
          Portfólio feito em React Native com Expo Router. Todo o conteúdo (perfil, formação, experiência e projetos) é buscado em tempo real no Back4App, então editar o painel do Back4App muda o app sem precisar publicar de novo. Puxe a tela para baixo para recarregar.
        </Text>
      </Card>
      <Card>
        <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>Tecnologias e módulos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          {techs.map(t => <Chip key={t} label={t} />)}
        </View>
      </Card>
      <Card>
        <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>Funcionalidade extra</Text>
        <Text style={{ color: colors.text, lineHeight: 21 }}>
          Na Home, o botão "Exportar currículo em PDF" busca os dados no back-end, monta um PDF com expo-print e abre o menu de compartilhamento do celular com expo-sharing, com vibração de confirmação (expo-haptics). Também há o tema claro/escuro abaixo, que fica salvo no aparelho.
        </Text>
      </Card>
      <Pressable onPress={toggle}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>Tema escuro</Text>
            <Switch value={isDark} onValueChange={toggle} trackColor={{ true: colors.accent }} />
          </View>
        </Card>
      </Pressable>
    </Screen>
  );
}
