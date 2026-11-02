import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Academica, Profile, Profissional, Projeto, fetchClass } from './api';

// Funcionalidade extra: gera o currículo em PDF a partir dos dados do back-end e abre o menu de compartilhar.
export async function exportarCurriculo() {
  const [p, ac, pr, pj] = await Promise.all([
    fetchClass<Profile>('Profile'),
    fetchClass<Academica>('Academica', '-createdAt'),
    fetchClass<Profissional>('Profissional', '-createdAt'),
    fetchClass<Projeto>('Projeto'),
  ]);
  const me = p[0];
  const sec = (t: string, body: string) => `<h2>${t}</h2>${body}`;
  const html = `<html><body style="font-family:Helvetica;padding:32px;color:#14172B">
    <h1 style="margin:0">${me.nome}</h1><p style="color:#5B5BF0;margin:4px 0">${me.titulo}</p>
    <p>${me.email} · ${me.github} · ${me.cidade}</p><p>${me.bio}</p>
    ${sec('Formação acadêmica', ac.map(a => `<p><b>${a.curso}</b> — ${a.instituicao} (${a.periodo})<br>${a.descricao}</p>`).join(''))}
    ${sec('Experiência profissional', pr.map(a => `<p><b>${a.cargo}</b> — ${a.empresa} (${a.periodo})<br>${a.descricao}</p>`).join(''))}
    ${sec('Projetos', pj.map(a => `<p><b>${a.nome}</b> [${(a.tecnologias ?? []).join(', ')}]<br>${a.descricao}</p>`).join(''))}
  </body></html>`;
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Compartilhar currículo' });
}
