# Artur Silva Araújo | Portfólio

Portfólio de Artur Silva Araújo, estudante de Engenharia de Software e desenvolvedor em formação. O site apresenta sites criados para clientes pela Verus Soluções Inteligentes, projetos próprios, tecnologias aplicadas e formas de contato, com foco em oportunidades de estágio e posições júnior.

## Acesso

- Site do portfólio: [euartursilva.github.io/PORTIF-LIO](https://euartursilva.github.io/PORTIF-LIO/)
- Todos os projetos: [github.com/euartursilva](https://github.com/euartursilva)
- LinkedIn: [perfil profissional](https://www.linkedin.com/in/artur-silva-araújo-9614a7213)

O site é publicado automaticamente pelo GitHub Pages a cada atualização na branch `main`.

## Sobre o projeto

Site estático em uma página, responsivo e acessível por navegação com âncoras. Apresenta sites de clientes com prints e links, projetos com seus escopos e limitações, habilidades demonstradas por evidências e um formulário de contato processado pelo FormSubmit. O cartucho Artur Boy é um elemento interativo opcional.

## Executar localmente

Abra `index.html` no navegador ou sirva a raiz do projeto com qualquer servidor HTTP estático. Para exibir uma foto no painel de identidade, adicione `foto-artur.jpg` à raiz.

## Estrutura

```text
PORTIF-LIO/
├── index.html
├── styles.css
├── index.js
├── img/clientes/   prints dos sites de clientes (800×500, JPG)
├── README.md
└── .github/workflows/deploy-pages.yml
```

## Adicionar um site de cliente

1. Salve um print da tela inicial em `img/clientes/<nome>.jpg`, com 800×500 pixels.
2. Em `index.html`, copie um bloco `<article class="client-card">` da seção `#clients` e troque nome, textos, situação (`No ar` ou `Demonstração`) e links.
3. Quando um site for publicado oficialmente pelo cliente, troque a etiqueta para `No ar` e adicione a classe `is-live`.

## Tecnologias

- HTML5 semântico
- CSS3 responsivo
- JavaScript puro
- Google Fonts

O formulário depende do serviço FormSubmit e de sua configuração/ativação para o endereço de email informado no HTML.
