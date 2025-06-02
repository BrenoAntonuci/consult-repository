# Deploy automático Lambda via GitHub Actions

Este projeto contém uma função Lambda em Node.js para consultar Repositorios e um workflow GitHub Actions para deploy automático.

## Como funciona

- O código da função Lambda está na pasta src do projeto (`index.mjs`).
- Toda vez que você fizer push no branch `main`, o GitHub Actions executa o workflow que:
  - Faz checkout do código.
  - Configura as credenciais AWS usando Secrets.
  - Compacta o código em um arquivo zip.
  - Atualiza a função Lambda na AWS com o novo código.

## Configuração necessária

1. Criar um usuário IAM na AWS com permissão `AWSLambdaFullAccess`.
2. Criar duas chaves de acesso para esse usuário (Access Key ID e Secret Access Key).
3. No repositório GitHub, adicionar dois **Secrets**:
   - `AWS_ACCESS_KEY_ID`: sua Access Key ID da AWS.
   - `AWS_SECRET_ACCESS_KEY`: sua Secret Access Key da AWS.
4. Verificar se o nome da função Lambda no workflow (`consult-repository`) está correto.
5. Ajustar a região AWS no workflow (`sa-east-1`).

## Como usar

- Faça alterações no arquivo `index.mjs`.
- Commit e push para o branch `main`.
- Aguarde o workflow executar o deploy automático.

## Testes

- Após o deploy, teste a função Lambda na AWS Console com um evento JSON:

## Deve ser informada uma query string, exemplo:

- https:{url_api}/?usuario=BrenoAntonuci

## Saida Esperada:
```json
[
  {
    "nome": "animal-friend",
    "url": "https://github.com/BrenoAntonuci/animal-friend"
  },
  {
    "nome": "api-vendas",
    "url": "https://github.com/BrenoAntonuci/api-vendas"
  },
  {
    "nome": "AtividadesProgramacao",
    "url": "https://github.com/BrenoAntonuci/AtividadesProgramacao"
  },
  {
    "nome": "BrenoAntonuci",
    "url": "https://github.com/BrenoAntonuci/BrenoAntonuci"
  },
  {
    "nome": "consult-repository",
    "url": "https://github.com/BrenoAntonuci/consult-repository"
  },
  {
    "nome": "exercise-list",
    "url": "https://github.com/BrenoAntonuci/exercise-list"
  },
  {
    "nome": "mini-programs-terminal-node",
    "url": "https://github.com/BrenoAntonuci/mini-programs-terminal-node"
  },
  {
    "nome": "note-system",
    "url": "https://github.com/BrenoAntonuci/note-system"
  },
  {
    "nome": "teste-git",
    "url": "https://github.com/BrenoAntonuci/teste-git"
  },
  {
    "nome": "umfg-programacao-iii-solid-turma-b",
    "url": "https://github.com/BrenoAntonuci/umfg-programacao-iii-solid-turma-b"
  }
]
```
Acesse esse link, apos isso é só trocar o usuário da url pra qual você deseja consultar

https://sl7vmhb2ff.execute-api.sa-east-1.amazonaws.com/default/consult-repository?usuario=BrenoAntonuci