#  Documentação da Biblioteca LIB_IHM

## ℹ Informações Gerais

- **Nome do Estudante:** Igor Alessandro Afonso Tavares  
- **Disciplina:** Interação Homem Máquina  
- **Curso:** Engenharia Informática - 2º Ano
- **Hospedagem:** Ngrok  
- **Repositório de Código:** GitHub (público)  

---

##  Descrição do Projeto

A **LIB_IHM** é uma biblioteca de componentes reutilizáveis desenvolvida para facilitar a construção de páginas web com estilos padronizados e funcionalidades dinâmicas, utilizando apenas **HTML, CSS e JavaScript nativos**.

O objetivo principal é **reduzir o tempo e esforço** necessários para desenvolver e manter o site institucional da Universidade Católica de Angola, especialmente com uma equipe reduzida.

---

##  Como Consumir a Biblioteca

### 1. Inclusão dos Arquivos

Adicione os seguintes arquivos ao seu projeto:

```html
<link rel="stylesheet" href="css/styles.css">
<script src="js/lib-ihm.js"></script>
<script src="js/app.js"></script>
```

---

### 2. Configuração Inicial

No arquivo `app.js`, configure o tema e as cores padrão:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    LIB_IHM.configurar({
        tema: 'claro', // ou 'escuro'
        corPrimaria: '#4285f4',
        bordaArredondada: '8px'
    });
});
```

---

### 3. Uso dos Componentes

####  Card

```javascript
const card = LIB_IHM.Card.criar({
    titulo: "Título do Card",
    conteudo: "Conteúdo do card aqui.",
    imagem: "caminho/para/imagem.jpg", // opcional
    rodape: "Rodapé opcional", // opcional
    efeitoHover: true,
    aoClicar: () => alert("Card clicado!")
});
```

####  Formulário com Inputs

```javascript
const inputTexto = LIB_IHM.Entrada.texto({
    rotulo: "Nome completo",
    placeholder: "Digite seu nome",
    id: "nome",
    obrigatorio: true
});

const checkbox = LIB_IHM.Entrada.checkbox({
    rotulo: "Receber newsletter",
    id: "newsletter",
    marcado: false
});
```

####  Carrossel

```javascript
const carrossel = LIB_IHM.Carrossel.criar({
    imagens: [
        "imagens/slide1.jpg",
        "imagens/slide2.jpg"
    ],
    intervalo: 5000,
    mostrarControles: true,
    mostrarIndicadores: true
});
```

####  Barra de Navegação

```javascript
const navbar = LIB_IHM.BarraNavegacao.criar({
    titulo: "Meu Site",
    fixo: true,
    links: [
        { texto: "Início", url: "#" },
        { texto: "Contato", url: "#contato" }
    ]
});
```

####  Tabela

```javascript
const tabela = LIB_IHM.Tabela.criar({
    colunas: [
        { titulo: "Nome", chave: "nome" },
        { titulo: "Idade", chave: "idade" }
    ],
    dados: [
        { nome: "João Silva", idade: 32 },
        { nome: "Maria Souza", idade: 28 }
    ],
    ordenavel: true
});
```

---

##  Funcionalidades Extras

- **Tema Escuro/Claro**
  - Alternância dinâmica entre temas via botão
  - Configuração automática de cores e estilos

- **Responsividade**
  - Layout adaptável para dispositivos móveis

- **Efeitos Visuais**
  - Hover em cards e botões
  - Transições suaves

---

##  Hospedagem e Acesso

- **Ngrok:**  
  A biblioteca está hospedada via Ngrok para acesso público à demonstração.  
   URL de Acesso: `https://84b192d0cfd0.ngrok-free.app/demo-lib-ihm/#`

- **GitHub:**  
  O código-fonte está disponível no repositório público.  
   [Repositório no GitHub](https://github.com/Igor-Tavares-AO/LIB_IHM)

---

##  Planejamento de Continuidade

###  Melhorias Futuras
- Adição de novos componentes (modal, tooltip, accordion)
- Suporte a temas personalizados

###  Documentação Ampliada
- Exemplos detalhados para cada componente
- Guia de contribuição para outros desenvolvedores

###  Integração
- Publicação como pacote **npm** para facilitar a instalação

---

## Demonstração

Acesse a demo para visualizar todos os componentes em funcionamento:  
 [**Link da Demo**](https://84b192d0cfd0.ngrok-free.app/demo-lib-ihm/#)

---

##  Contato

**Igor Alessandro Afonso Tavares**  
 Email: alessandro123.pt@gmail.com  
 GitHub: [@Igor-Tavares](https://github.com/Igor-Tavares)
