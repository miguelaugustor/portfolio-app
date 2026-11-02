// Popula o Back4App. Uso: B4A_APP_ID=... B4A_REST_KEY=... node scripts/seed.mjs
// EDITE os dados abaixo antes de rodar (o que é exemplo está marcado).
const H = { 'Content-Type': 'application/json', 'X-Parse-Application-Id': process.env.B4A_APP_ID, 'X-Parse-REST-API-Key': process.env.B4A_REST_KEY };
const post = (cls, body) => fetch(`https://parseapi.back4app.com/classes/${cls}`, { method: 'POST', headers: H, body: JSON.stringify(body) }).then(r => r.json()).then(j => console.log(cls, j.objectId ?? j));

await post('Profile', {
  nome: 'Miguel Augusto Lima de Oliveira', titulo: 'Estudante de Engenharia de Software',
  bio: 'EDITE: fale em 2 ou 3 frases sobre você, o que estuda e o que busca.',
  email: 'EDITE@email.com', github: 'miguelaugustor', linkedin: '', cidade: 'EDITE, Brasil',
});
await post('Academica', { curso: 'EDITE: seu curso', instituicao: 'EDITE: sua universidade', periodo: '2024 - atual', descricao: 'Projetos em equipe, POO, banco de dados, desenvolvimento web e mobile.' });
await post('Profissional', { cargo: 'EDITE: cargo/estágio', empresa: 'EDITE: empresa', periodo: 'EDITE', descricao: 'Automação de testes E2E com Playwright e TypeScript.' });
await post('Projeto', { nome: 'Controle de Frequência (API)', descricao: 'API REST em Spring Boot para controle de frequência, feita para a disciplina de POO.', tecnologias: ['Java', 'Spring Boot'], link: 'https://github.com/joao-emanuel-melo/Controle-de-frequencia_POO' });
await post('Projeto', { nome: 'Controle de Frequência por Reconhecimento Facial', descricao: 'Sistema de presença escolar com reconhecimento facial.', tecnologias: ['Python', 'DeepFace', 'OpenCV'], link: '' });
await post('Projeto', { nome: 'Trainify', descricao: 'Learning Manager System com backend, frontend e serviço de IA.', tecnologias: ['Spring Boot', 'TypeScript', 'Python'], link: 'https://github.com/joao-emanuel-melo/Trainify' });
await post('Projeto', { nome: 'PresenSee', descricao: 'Painel de presença escolar em React.', tecnologias: ['React'], link: '' });
