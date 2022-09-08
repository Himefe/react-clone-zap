# Projeto React: "Clone" do WhatsApp

É um projeto feito em React que consiste no clone de algumas funcionalidades do WhatsApp Web,
não digo exatamente clone, pois não há todas as funcionalidades que existem atualmente no WhatsApp Web, o projeto foi feito juntamente com o curso de React da B7WEB. Quis me desafiar a fazer utilizando redux e colocar back-end, onde no curso não utilizava Redux e nem Node.

No front-end foi utilizado React, além disso, para diminuir a quantidade de useStates, foi utilizado o Redux, que é um gerenciador de estados;

No back foi utilizado NodeJS utilizando o framework ExpressJS;
E o banco utilizado foi o Firebase, da Google.

Nele, você consegue fazer login com o Google. Assim que você loga, é cadastrado automaticamente no banco de dados como usuário.

A lista de contatos consiste em TODOS os usuários do banco que foram cadastrados utilizando o login do Google.

Como não é possível demonstrar as funcionalidades na internet, por ter back-end, para testá-lo, será NECESSÁRIO fazer alguns passos, cujo são:

- Clonar o repositório / Baixar;
- Abrir o terminal e digitar: npm install; (Para que possa baixar todos os pacotes requeridos que está no package.json);
- Ainda no terminal, digitar: npm start (Para que o servidor LOCAL rode o back-end );
- Abrir outro terminal (OBS: Não fechar o terminal anterior), digitar: npm run dev. (Nele terá o link para a aplicação).

A partir disto, o servidor estará rodando, e a aplicação estará rodando no seu navegador. Após isso, só clicar no botão: Logar com o Google e digitar suas credencias (caso não esteja logado);

Como não há nenhuma conversa, será necessário abrir um novo chat (Como é feito no WhatsApp Web normal), e selecionar a pessoa que desejas conversar.

As mensagens ocorrem em "real-time", então assim que enviar a mensagem, a pessoa com quem estás conversando receberá.

Obs: Pode haver alguns bugs, é BEM provável que tenha, foi apenas um projeto (depois de ter quebrado bastante a cabeça) para poder atualizar meus conhecimentos.

Acredito também que o código não está BEM feito, mas é pra isso que estou treinando.

Haverá mudanças na forma de chamada de states (useSelector, useDispatch) do redux, para que não seja importado do redux sempre que eu quiser alguma funcionalidade dele, então, armazenarei isto em um arquivo separado e importar este arquivo sempre que necessário.
