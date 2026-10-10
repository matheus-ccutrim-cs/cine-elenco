# Lista de Compras

Aplicativo de lista de compras desenvolvido com **React Native e Expo**. A interface permite adicionar produtos e acompanhar a lista e a quantidade de itens em tempo real.

O projeto foi desenvolvido para o CheckPoint 2 da disciplina **Cross-Platform Application Development**, com foco na combinação de `useState` e `FlatList` para gerenciar e exibir dados de forma dinâmica.

## Funcionalidades

- Inclusão de produtos por um campo de texto e pelo botão **Adicionar**.
- Exibição dos produtos em uma lista numerada, na ordem de inclusão.
- Contador atualizado conforme novos itens são adicionados.
- Validação para impedir a inclusão de textos vazios ou compostos apenas por espaços.
- Remoção de espaços no início e no final do nome do produto.
- Limpeza automática do campo após cada inclusão.
- Mensagem de orientação quando a lista está vazia.
- Execução no Android, iOS e navegador por meio do Expo.

Os dados são mantidos em memória durante a execução. Ao reiniciar ou recarregar o aplicativo, a lista volta ao estado inicial vazio.

## Tecnologias

| Tecnologia | Finalidade |
| --- | --- |
| JavaScript | Implementação da lógica do aplicativo |
| React | Componentes e gerenciamento de estado |
| React Native | Construção da interface multiplataforma |
| Expo SDK 55 | Ambiente de desenvolvimento e execução |
| React Native Web | Execução da interface no navegador |
| StyleSheet | Organização dos estilos dos componentes |

As dependências são declaradas em `package.json`, e suas versões resolvidas são registradas em `package-lock.json`.

## Estrutura do projeto

| Arquivo | Descrição |
| --- | --- |
| `App.js` | Componente principal, com interface, estados, função de inclusão, FlatList e estilos |
| `index.js` | Ponto de entrada que registra o componente principal com `registerRootComponent` |
| `app.json` | Configurações do Expo, incluindo nome, versão, orientação e tema do aplicativo |
| `package.json` | Metadados, dependências e scripts de execução |
| `package-lock.json` | Registro das versões das dependências para instalações reproduzíveis |
| `.gitignore` | Regras que excluem dependências e arquivos gerados do controle de versão |
| `README.md` | Documentação do projeto |

Durante a instalação e a execução, as ferramentas podem gerar as pastas `node_modules/` e `.expo/`. A exportação web gera a pasta `dist/`. Essas pastas estão incluídas no `.gitignore`.

## Funcionamento

### Gerenciamento de estado

O aplicativo utiliza dois estados:

```js
const [novoItem, setNovoItem] = useState('');
const [itens, setItens] = useState([]);
```

`novoItem` representa o conteúdo do campo de texto, enquanto `itens` armazena os produtos adicionados. O `TextInput` é controlado pelo estado por meio das propriedades `value` e `onChangeText`.

### Inclusão de produtos

A função `adicionarItem` valida o texto, cria um objeto com identificador único e nome, atualiza a lista e limpa o campo de entrada.

```js
function adicionarItem() {
  const nome = novoItem.trim();
  if (!nome) return;

  const item = { id: String(proximoId.current++), nome };
  setItens((listaAtual) => [...listaAtual, item]);
  setNovoItem('');
}
```

A referência `proximoId` é inicializada com `useRef(1)` e mantém a sequência de identificadores entre renderizações. Produtos com nomes iguais podem ser adicionados e recebem identificadores diferentes.

A atualização utiliza o operador spread para criar um novo array a partir da lista anterior, preservando a imutabilidade do estado e dispensando o uso de `.push()`.

### Exibição da lista

A `FlatList` recebe os produtos pela propriedade `data`. Cada linha é construída por `renderItem`, e `keyExtractor` utiliza o identificador do produto como chave. Quando a lista está vazia, `ListEmptyComponent` apresenta uma mensagem de orientação.

A alteração do estado provoca uma nova renderização da interface, atualizando a lista e o contador de itens.

### Interface

A interface utiliza `View`, `Text`, `TextInput` e `Pressable`, com estilos definidos por `StyleSheet.create`. O botão **Adicionar** permanece desabilitado quando o campo não contém um nome válido. O layout inclui `KeyboardAvoidingView` para ajustar o conteúdo ao teclado no iOS.

## Pré-requisitos

- Node.js 20.19.4 ou superior, em uma versão compatível com o Expo SDK 55.
- npm.
- Navegador para execução web.
- Expo Go compatível com o SDK 55 ou uma build de desenvolvimento compatível para execução em um dispositivo móvel.

Para execução em emuladores, é necessário ter um ambiente Android configurado ou, no caso do simulador iOS, macOS com Xcode.

## Instalação

Na pasta raiz do projeto, onde está o arquivo `package.json`, execute:

```sh
npm ci
```

O comando instala as dependências registradas em `package-lock.json`.

## Execução

### Navegador

```sh
npm run web
```

Abra o endereço apresentado no terminal caso o navegador não seja iniciado automaticamente.

### Dispositivo móvel

```sh
npm start
```

Com o computador e o celular conectados à mesma rede, leia o QR code apresentado pelo Expo. No Android, utilize o leitor do Expo Go; no iOS, utilize a câmera para abrir o projeto no Expo Go.

A versão do Expo Go deve ser compatível com o SDK 55. Também é possível executar o projeto com uma build de desenvolvimento compatível.

### Emulador Android

Com o emulador configurado e iniciado, execute:

```sh
npm run android
```

### Simulador iOS

Em um computador macOS com Xcode e simulador configurados, execute:

```sh
npm run ios
```

Para encerrar o servidor de desenvolvimento, pressione **Ctrl + C** no terminal.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run web` | Inicia a execução no navegador |
| `npm run android` | Inicia a execução no ambiente Android configurado |
| `npm run ios` | Inicia a execução no simulador iOS configurado |
| `npx expo start --clear` | Inicia o servidor com limpeza do cache do Metro |
| `npx expo export --platform web` | Gera os arquivos da versão web na pasta `dist/` |

No PowerShell, caso a política de execução bloqueie `npm.ps1` ou `npx.ps1`, os mesmos comandos podem ser executados com `npm.cmd` e `npx.cmd`, por exemplo:

```powershell
npm.cmd ci
npm.cmd run web
```
