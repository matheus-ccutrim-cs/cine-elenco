const lista = document.getElementById('lista-atores');
const contador = document.getElementById('contador');
const semResultados = document.getElementById('sem-resultados');

// A divisão da string evita alterações de dia causadas pelo fuso horário.
function formatarData(data) {
  if (!data) return 'Não informado';
  return data.split('-').reverse().join('/');
}

function criarCard(ator) {
  const card = document.createElement('article');
  card.className = 'card';

  const retrato = document.createElement('div');
  retrato.className = 'portrait';
  const foto = document.createElement('img');
  foto.src = ator.foto;
  foto.alt = `Foto de ${ator.nome}`;
  foto.loading = 'lazy';
  foto.width = 210;
  foto.height = 260;
  foto.onerror = function () {
    const substituto = document.createElement('div');
    substituto.className = 'fallback';
    substituto.textContent = ator.nome.split(' ').map(parte => parte[0]).slice(0, 2).join('');
    substituto.setAttribute('role', 'img');
    substituto.setAttribute('aria-label', `Foto de ${ator.nome} indisponível`);
    foto.replaceWith(substituto);
  };
  retrato.appendChild(foto);

  const conteudo = document.createElement('div');
  conteudo.className = 'card-content';
  const nome = document.createElement('h3');
  nome.textContent = ator.nome;
  const detalhes = document.createElement('dl');
  for (const [rotulo, valor] of [['País', ator.pais || 'Não informado'], ['Nascimento', formatarData(ator.nascimento)]]) {
    const grupo = document.createElement('div');
    const titulo = document.createElement('dt');
    titulo.textContent = rotulo;
    const descricao = document.createElement('dd');
    descricao.textContent = valor;
    grupo.append(titulo, descricao);
    detalhes.appendChild(grupo);
  }
  conteudo.append(nome, detalhes);
  card.append(retrato, conteudo);
  return card;
}

function renderizarAtores(pessoas) {
  const fragmento = document.createDocumentFragment();
  pessoas.forEach(ator => fragmento.appendChild(criarCard(ator)));
  lista.replaceChildren(fragmento);
  contador.textContent = `${pessoas.length} de ${atores.length} pessoas`;
  semResultados.hidden = pessoas.length > 0;
}

// Chamada pelo oninput do campo: a lista muda a cada letra digitada.
function filtrarAtores() {
  const busca = document.getElementById('busca').value.trim().toLowerCase();
  const filtrados = atores.filter(ator => ator.nome.toLowerCase().includes(busca));
  renderizarAtores(filtrados);
}

// Ao abrir a página, mostra o array inteiro fornecido pelo professor.
renderizarAtores(atores);
