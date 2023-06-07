# Documentação Técnica - Aplicativo React Native com Firebase

Esta documentação fornece informações sobre a arquitetura e as etapas necessárias para configurar e executar o aplicativo React Native com integração ao Firebase. O aplicativo permite que os usuários façam login, cadastrem dispositivos e controlem o status desses dispositivos.

# Arquitetura do Aplicativo

O aplicativo é desenvolvido em React Native, uma estrutura de desenvolvimento de aplicativos móveis multiplataforma. Ele utiliza o Firebase para autenticação de usuários e armazenamento de dados em tempo real e utilização do Jest para um ambiente de testes em react native.

# Dependências utilizadas

O aplicativo utiliza as seguintes dependências:

- React Native: Framework de desenvolvimento de aplicativos móveis.
- Firebase: Plataforma de desenvolvimento de aplicativos móveis e web do Google.

## Configuração do Firebase

O Firebase é uma plataforma fornecida pelo Google que oferece uma variedade de serviços para o desenvolvimento de aplicativos móveis e web. Para configurar o Firebase no aplicativo, siga as etapas abaixo:

Para instalação do projeto utilize a função dentro da raiz do projeto:
```
npm install firebase
```

## Para criação de aplicativo caso tenha interesse:

1. Faça login na [Console do Firebase](https://console.firebase.google.com/) com sua conta do Google.
2. Crie um novo projeto ou selecione um projeto existente.
3. No painel do projeto, clique em "Adicionar app" para adicionar um novo aplicativo ao projeto.
4. Siga as instruções fornecidas para adicionar um aplicativo Android ou iOS, dependendo da plataforma alvo.
5. Ao adicionar o aplicativo, você receberá um arquivo de configuração `google-services.json` para o Android ou `GoogleService-Info.plist` para o iOS. Baixe esse arquivo e guarde-o para uso posterior.
6. No arquivo de código-fonte do aplicativo fornecido, cole as informações de configuração do Firebase no objeto `firebaseConfig`.

# Configuração do Ambiente de Desenvolvimento

Para configurar o ambiente de desenvolvimento e executar o aplicativo em um emulador ou dispositivo real, siga as etapas abaixo:

1. Certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node.js) instalados em sua máquina. Você pode baixar o Node.js no site oficial [nodejs.org](https://nodejs.org/).
2. Instale o React Native CLI executando o seguinte comando no terminal:
   ```
   npm install -g react-native-cli
   ```
3. No diretório raiz do projeto, instale as dependências do aplicativo executando o seguinte comando no terminal:
   ```
   npm install
   ```
4. Abra o arquivo `android/app/build.gradle` e certifique-se de que a versão do SDK Android seja compatível com a versão do React Native e do Firebase.
5. Se estiver executando o aplicativo em um dispositivo Android, abra o arquivo `android/local.properties` e adicione a localização do SDK Android. Por exemplo:
   ```
   sdk.dir=/Users/username/Library/Android/sdk
   ```
6. Execute o seguinte comando no terminal para iniciar o aplicativo no emulador ou dispositivo conectado:
   - Para dispositivos iOS:
     ```
     npx react-native run-ios
     ```
   - Para dispositivos Android:
     ```
     npx react-native run-android
     ```

Após seguir essas etapas, o aplicativo React Native será compilado e iniciado no emulador ou dispositivo real.



# Tela de Login e Cadastro
A primeira tela exibida no aplicativo é a tela de login e cadastro. O usuário pode inserir seu email e senha para fazer login ou criar uma nova conta.

# Tela Principal

Após fazer login, o usuário é redirecionado para a tela principal do aplicativo. Nessa tela, ele pode visualizar a lista de dispositivos cadastrados e realizar as seguintes ações:

- Adicionar dispositivo: Preencha os campos solicitados para adicionar um novo dispositivo à lista.
- Logout: Volta para a tela de login. 
- Ativar/Desativar dispositivo: Alterna o status de ativação do dispositivo.
- Excluir dispositivo: Remova o dispositivo da lista.
A lista de dispositivos é exibida usando o componente `FlatList`, permitindo a rolagem e a renderização eficiente dos itens.



# Teste do Aplicativo

Será necessário a instalação da biblioteca JEST
```
npm install --save-dev jest react-test-renderer @testing-library/react-native
npm install --save-dev @testing-library/react-native
```

Para rodar os testes utilize a função na raiz do projeto com a função

```
npx jest ou npm jest
```

# Teste: renders

Objetivo: Verificar se o componente App é renderizado corretamente.
Descrição: Renderiza o componente App e verifica se nenhum erro ocorreu durante a renderização.

# Teste: handles sign-in (login de usuário correto)

Objetivo: Verificar se o login de um usuário com informações corretas é tratado adequadamente.
Descrição: Renderiza o componente App, preenche os campos de e-mail e senha corretamente, pressiona o botão de login e aguarda até que a função signInWithEmailAndPassword seja chamada com os parâmetros corretos.

# Teste: handles sign-in (login de usuário com senha incorreta)

Objetivo: Verificar se o login de um usuário com uma senha incorreta é tratado adequadamente.
Descrição: Renderiza o componente App, preenche os campos de e-mail e senha com uma senha incorreta, pressiona o botão de login e aguarda até que a função signInWithEmailAndPassword seja chamada com os parâmetros corretos.

# Teste: handles sign-up (cadastro de usuário)

Objetivo: Verificar se o cadastro de um novo usuário é tratado adequadamente.
Descrição: Renderiza o componente App, preenche os campos de e-mail e senha corretamente, pressiona o botão de cadastro e aguardar até que a função createUserWithEmailAndPassword seja chamada com os parâmetros corretos.

# Teste: handles add device (adição de dispositivo)

Objetivo: Verificar se a adição de um dispositivo é tratada adequadamente.
Descrição: Renderiza o componente App, realiza o login de um usuário, preenche os campos de nome, tipo, localização e temperatura de um dispositivo corretamente, pressiona o botão de adicionar dispositivo e aguarda até que a função addDoc seja chamada com os parâmetros corretos.

# Teste: handles device deletion (exclusão de dispositivo)
Objetivo: Verificar se a exclusão de um dispositivo é tratada adequadamente.
Descrição: Renderiza o componente App, realiza o login de um usuário, simula o pressionamento do botão de exclusão de um dispositivo e verifica se a função Alert.alert foi chamada com os parâmetros corretos.
Certifique-se de que as configurações de importação estejam corretas e de que todas as dependências necessárias estejam instaladas para garantir a execução correta dos testes.

# Considerações Finais

Esta documentação forneceu uma visão geral da arquitetura do aplicativo React Native com Firebase, bem como instruções para configurar o ambiente de desenvolvimento e executar o aplicativo. O aplicativo fornece recursos de login, cadastro, adição de dispositivos e controle de status.

Certifique-se de verificar a documentação oficial do React Native e do Firebase para obter informações adicionais sobre como estender as funcionalidades do aplicativo e aproveitar ao máximo essas plataformas.

