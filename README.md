<h1 align="center">
Caçador de Jogos 🎮
</h1>

<div align="center">
<!-- Substitua o link abaixo por um print real do seu projeto depois -->
<img src="https://github.com/williamalonso/olx-favorites-manager/blob/master/public/home.png" alt="Demonstração do Caçador de Jogos" width="600" />
</div>

🤔 Sobre o Projeto?

O Caçador de Jogos é um ecossistema simples para monitorar anúncios de jogos de PS4 e PS5 encontrados na OLX.

O projeto resolve o problema de perder anúncios interessantes ou ter que criar planilhas manuais. Ele funciona em duas partes:

Extensão do Chrome: Um botão injetado na página da OLX que "lê" o preço, título e imagem do anúncio e salva na nuvem.

Dashboard Web: Um site onde você visualiza sua lista de desejos e gerencia os jogos salvos.

Diferente da versão inicial local, agora o projeto utiliza Pantry Cloud como banco de dados, permitindo que você acesse seus saves tanto do PC quanto do celular (via Vercel).

🚀 Tecnologias

Esse projeto utiliza as seguintes tecnologias:

- [React (Vite)](https://vite.dev/guide/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Pantry Cloud API](https://getpantry.cloud/)
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions/reference/api?hl=pt-br)
- [Lucide React (Ícones)](https://lucide.dev/guide/packages/lucide-react)


🙅 Instalação e Uso

Pré-requisitos

Você precisará de um ID do Pantry Cloud (gratuito) para servir como banco de dados.

1. Configurando o Dashboard (Site)

Clone o repositório e instale as dependências:

```
# Clone o repositório
$ git clone [https://github.com/SEU_USUARIO/cacador-de-jogos.git](https://github.com/SEU_USUARIO/cacador-de-jogos.git)
```

# Entre na pasta
```$ cd cacador-de-jogos```

# Instale as dependências
```$ npm install```


Configure sua API no arquivo src/App.jsx:

```const API_URL = 'insira_sua_url';```


Rode o projeto:

```$ npm run dev```


2. Configurando a Extensão

Vá até o arquivo extension/content.js (ou onde estiver seu script) e coloque a mesma URL do Pantry na constante PANTRY_URL.

Abra o navegador Chrome e digite chrome://extensions.

Ative o Modo do Desenvolvedor (canto superior direito).

Clique em Carregar sem compactação e selecione a pasta da extensão.

Acesse um anúncio na OLX e o botão "Salvar no Caçador" aparecerá!

<h3 align="center">William Alonso</h3>
