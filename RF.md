## Requisitos Funcionais

1. Tela de Login
   [x] Campos para e-mail e senha
   [x] Validação de e-mail válido e senha com pelo menos 6 caracteres
   [x] Botão Entrar : simula login e navega para o painel do parceiro
   [x] Utilizar AsyncStorage para simular sessão salva
   [x] Se o usuário estiver logado, ir direto para o painel ao abrir o app

2. Painel de Clientes (Tela Principal)
   [x] Listagem de clientes com: Nome, CPF ou CNPJ, Saldo
   [x] Barra de pesquisa por CPF/CNPJ ou Nome
   [x] Botão para criar novo cliente
   [x] Botão para excluir cliente

3. Tela de Criação de Cliente
   [x] Campos obrigatórios: Nome, CPF/CNPJ, Idade/Data Fundação,
   Renda Mensal
   [x] Ao salvar, o cliente deve aparecer na listagem

4. Tela de Atualização de Cliente[x]
   [x] Edição dos campos: Nome, Idade/Data de Fundação, Renda Mensal
   [X] Botão para editar dados do cliente (Nome, Idade/Data Fundação,
   Renda Mensal)

5. Transações entre Contas [x] (outra branch)
   [x] Selecionar cliente de origem e cliente de destino (ambos do mesmo
   parceiro)
   [x] Inserir valor da transferência
   [x] Validar se o cliente origem possui saldo suficiente
   [x] Realizar a transferência e atualizar os saldos
   [x] Refatoraçao da Transfer Screen e components reutilizaveis para esta tela
   [x] Hooks Personalizados

⚖️ Requisitos Técnicos

[x] React Native com TypeScript
[x] Navegação com React Navigation (Stack + Bottom Tabs ou Drawer)
[x] Gerenciamento de estado com Context API ou Redux Toolkit
[-] (Opcional) Consumo de API com Axios ou Fetch(ultilizaçao de mock api local)
[x] Estilização com StyleSheet ou Tailwind RN
[x] Persistência com AsyncStorage
[x] Componentes funcionais e uso adequado de Hooks
[x] (Opcional) Testes com Jest e React Native Testing Library
[x] Eslint e Prettier configurados com configuraçoes usadas por grandes empresas
[x] Refatoraçao de Components e Logicas
[x] Mudanças de UI
