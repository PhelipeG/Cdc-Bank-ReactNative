## Requisitos Funcionais

1. Tela de Login
   [x] Campos para e-mail e senha
   [x] Validação de e-mail válido e senha com pelo menos 6 caracteres
   [x] Botão &quot;Entrar&quot;: simula login e navega para o painel do parceiro
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
   [] Ao salvar, o cliente deve aparecer na listagem

4. Tela de Atualização de Cliente
   [] Edição dos campos: Nome, Idade/Data de Fundação, Renda Mensal
   [] Botão para editar dados do cliente (Nome, Idade/Data Fundação,
   Renda Mensal)

5. Transações entre Contas
   [] Selecionar cliente de origem e cliente de destino (ambos do mesmo
   parceiro)
   [] Inserir valor da transferência
   [] Validar se o cliente origem possui saldo suficiente
   [] Realizar a transferência e atualizar os saldos

⚖️ Requisitos Técnicos

[x] React Native com TypeScript
[x] Navegação com React Navigation (Stack + Bottom Tabs ou Drawer)
[x] Gerenciamento de estado com Context API ou Redux Toolkit
[ ] (Opcional) Consumo de API com Axios ou Fetch
[x] Estilização com StyleSheet ou Tailwind RN
[x] Persistência com AsyncStorage
[-] Componentes funcionais e uso adequado de Hooks
[ ] (Opcional) Testes com Jest e React Native Testing Library
