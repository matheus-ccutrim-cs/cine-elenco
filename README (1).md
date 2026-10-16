# 🎬 Cine elenco

Catálogo interativo de atores e atrizes desenvolvido com **HTML, CSS e JavaScript**, com foco na renderização dinâmica de dados e na busca pelo nome em tempo real.

O projeto foi desenvolvido para o **CheckPoint 2 da disciplina Application Development**, aplicando conceitos de manipulação do DOM, eventos e métodos de arrays em uma interface inspirada no universo do cinema.

## Sobre o projeto

O Cine elenco reúne **75 atores e atrizes** em um grid de cards. Cada card apresenta a fotografia, o nome, o país e a data de nascimento da pessoa, utilizando os registros do arquivo `dados.js` fornecido para a atividade.

A busca atualiza o catálogo conforme o usuário digita, sem recarregar a página. A aplicação funciona inteiramente no navegador, sem backend, frameworks ou dependências externas de código.

## Funcionalidades

- **Catálogo completo:** exibição de todos os registros ao abrir a página.
- **Cards informativos:** foto, nome, país e nascimento no formato `DD/MM/AAAA`.
- **Busca em tempo real:** filtragem por nome completo ou parte do nome.
- **Busca sem distinção de maiúsculas e minúsculas:** termos como `Tom`, `tom` e `TOM` retornam os mesmos resultados.
- **Contador de resultados:** indicação da quantidade de pessoas exibidas em relação ao total.
- **Estado vazio:** mensagem de orientação quando nenhum nome corresponde à busca.
- **Restauração do catálogo:** ao apagar o texto da busca, todos os cards reaparecem.
- **Tratamento de falhas nas imagens:** fotografias indisponíveis são substituídas pelas iniciais da pessoa.
- **Layout responsivo:** organização dos cards adaptada a diferentes tamanhos de tela.

## Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
| --- | --- |
| **HTML5** | Estrutura semântica da página, campo de busca e áreas do catálogo. |
| **CSS3** | Identidade visual, estilos dos cards, efeitos de interação e responsividade. |
| **CSS Grid** | Distribuição dos cards em colunas que se adaptam à largura da tela. |
| **Flexbox** | Alinhamento do cabeçalho, campo de busca e rodapé. |
| **JavaScript** | Criação dos elementos, renderização dos dados e filtragem do catálogo. |
| **DOM API** | Atualização do conteúdo da página em resposta à interação do usuário. |

## Estrutura do projeto

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Define o cabeçalho, a apresentação do aplicativo, o campo de busca, o catálogo e o rodapé. Carrega os arquivos de dados e de comportamento com `defer`. |
| `style.css` | Centraliza a identidade visual, o grid, os estilos dos cards e as media queries. |
| `dados.js` | Contém o array original `atores`, com 75 objetos e os campos `id`, `nome`, `pais`, `nascimento` e `foto`. |
| `script.js` | Implementa a criação dos cards, a formatação das datas, a renderização e a busca. |
| `.gitignore` | Define arquivos e pastas que não fazem parte do versionamento, incluindo `node_modules`. |
| `README.md` | Documenta o propósito, as funcionalidades e a organização da aplicação. |

## Desenvolvimento e funcionamento

### 1. Organização dos dados

A base de dados foi mantida no arquivo `dados.js`, separada da estrutura HTML e da lógica da interface. Cada objeto representa uma pessoa e fornece os dados necessários para montar seu card.

Os registros originais foram preservados, incluindo os nomes dos países e as URLs das fotografias. A aplicação utiliza esse array local diretamente; não realiza chamadas à API da TVmaze para buscar os registros.

### 2. Criação dinâmica dos cards

A função `criarCard(ator)` constrói um elemento `article` para cada pessoa por meio de `document.createElement()`. Nome, país e data são inseridos com `textContent`, e os detalhes são organizados em uma lista de descrição com `dl`, `dt` e `dd`.

A função `renderizarAtores(pessoas)` reúne os cards em um `DocumentFragment` e substitui o conteúdo do grid com `replaceChildren()`. Na mesma atualização, ajusta o contador e a visibilidade da mensagem de nenhum resultado.

No carregamento inicial, `renderizarAtores(atores)` apresenta o catálogo completo.

### 3. Filtragem por nome

O campo de texto utiliza o evento `oninput` para chamar `filtrarAtores()` sempre que seu conteúdo muda.

```javascript
function filtrarAtores() {
  const busca = document.getElementById('busca').value.trim().toLowerCase();
  const filtrados = atores.filter(ator => ator.nome.toLowerCase().includes(busca));
  renderizarAtores(filtrados);
}
```

Nesse processo:

- `trim()` remove espaços nas extremidades do texto digitado.
- `toLowerCase()` permite comparar nomes sem distinguir maiúsculas de minúsculas.
- `filter()` cria um novo array apenas com os registros correspondentes.
- `includes()` verifica se o nome contém o trecho pesquisado.
- `renderizarAtores()` exibe os resultados na interface.

Por exemplo, a busca por **Tom** apresenta **Tom Cavanagh, Tom Ellis, Tom Hiddleston e Tom Holland**. O array original permanece intacto durante a filtragem.

### 4. Formatação das datas

A função `formatarData()` converte as datas do padrão `AAAA-MM-DD` para `DD/MM/AAAA` utilizando operações de string. Essa abordagem evita mudanças no dia que poderiam ocorrer com conversões de data dependentes do fuso horário.

### 5. Imagens e estados da interface

As fotografias utilizam `loading="lazy"`, permitindo que o navegador adie o carregamento das imagens fora da área visível. O evento `onerror` substitui fotos que falham por um elemento com as iniciais da pessoa.

Quando a busca não encontra registros, o aplicativo apresenta uma mensagem sugerindo outro nome ou a limpeza do campo.

## Interface e acessibilidade

A identidade visual combina fundo escuro, destaque em verde e fotografias em formato de retrato. O grid varia entre cinco e duas colunas conforme a largura da tela.

A interface também inclui:

- Idioma da página definido como português do Brasil.
- Rótulo associado ao campo de busca.
- Texto alternativo nas fotografias.
- Identificação acessível para imagens indisponíveis.
- Contador com `aria-live="polite"` para anunciar atualizações a tecnologias assistivas.
- Destaque visual de foco no campo de busca.
- Respeito à preferência de redução de movimento nas transições dos cards.

## Conceitos aplicados

O desenvolvimento exercita a separação entre estrutura, apresentação e comportamento, além de manipulação do DOM, funções, iteração sobre arrays, tratamento de eventos e atualização dinâmica da interface.

O uso de JavaScript puro mantém explícito o fluxo entre os dados, a interação no campo de busca e a renderização dos resultados.

## Origem dos dados

Os dados e as URLs das fotos fazem parte do arquivo fornecido para a atividade, cuja origem indicada é a **TVmaze**. As imagens são carregadas de endereços externos e dependem de conexão com a internet e da disponibilidade do serviço. O catálogo e a busca utilizam os dados locais.
