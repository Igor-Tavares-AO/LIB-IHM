// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Configurar tema inicial
    LIB_IHM.configurar({
        tema: 'claro',
        corPrimaria: '#4285f4',
        bordaArredondada: '8px'
    });

    // Inicializar componentes
    inicializarNavbar();
    inicializarBreadcrumb();
    inicializarCarrossel();
    inicializarCards();
    inicializarFormulario();
    inicializarTabela();
    inicializarTabs();
    inicializarGrupoBotoes();
    configurarAlternadorTema();
});

// Alternador de tema
function configurarAlternadorTema() {
    const botaoTema = document.getElementById('alternar-tema');
    botaoTema.addEventListener('click', function() {
        const temaAtual = document.body.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
        document.body.setAttribute('data-tema', temaAtual);
        LIB_IHM.configurar({ tema: temaAtual });
        botaoTema.textContent = temaAtual === 'claro' ? 'Tema Escuro' : 'Tema Claro';
    });
}

// Carrossel
function inicializarCarrossel() {
    const carrossel = LIB_IHM.Carrossel.criar({
        imagens: [
            'imagens/slide1.jpg',
            'imagens/slide2.jpg',
            'imagens/slide3.jpg'
        ],
        intervalo: 5000,
        mostrarControles: true,
        mostrarIndicadores: true
    });

    document.getElementById('carrossel-container').appendChild(carrossel);
}

// Cards
function inicializarCards() {
    const container = document.getElementById('cards-container');
    
    // Card simples
    const card1 = LIB_IHM.Card.criar({
        titulo: "Card Simples",
        conteudo: "Este é um exemplo básico de card com texto simples.",
        rodape: "Rodapé opcional"
    });
    
    // Card com imagem
    const card2 = LIB_IHM.Card.criar({
        titulo: "Card com Imagem",
        conteudo: "Este card inclui uma imagem e efeito hover.",
        imagem: "imagens/slide1.jpg",
        efeitoHover: true,
        aoClicar: () => alert("Card clicado!")
    });
    
    // Card com botão
    const card3 = LIB_IHM.Card.comBotao({
        titulo: "Card com Botão",
        conteudo: "Este card inclui um botão de ação.",
        textoBotao: "Ação Principal",
        varianteBotao: "primario",
        aoClicarBotao: () => alert("Botão do card clicado!")
    });
    
    container.appendChild(card1);
    container.appendChild(card2);
    container.appendChild(card3);
}

// Formulário
function inicializarFormulario() {
    const container = document.getElementById('formulario-container');
    
    // Campo de texto
    const nome = LIB_IHM.Entrada.texto({
        rotulo: "Nome completo",
        placeholder: "Digite seu nome",
        id: "nome",
        obrigatorio: true
    });
    
    // Campo de email
    const email = LIB_IHM.Entrada.texto({
        rotulo: "E-mail",
        placeholder: "seu@email.com",
        id: "email",
        obrigatorio: true
    });
    
    // Campo de data
    const dataNascimento = LIB_IHM.Entrada.data({
        rotulo: "Data de nascimento",
        id: "data-nascimento"
    });
    
    // Dropdown
    const assunto = LIB_IHM.Entrada.dropdown({
        rotulo: "Assunto",
        id: "assunto",
        obrigatorio: true,
        opcoes: [
            { rotulo: "Selecione um assunto", valor: "", selecionado: true },
            { rotulo: "Dúvida", valor: "duvida" },
            { rotulo: "Sugestão", valor: "sugestao" },
            { rotulo: "Reclamação", valor: "reclamacao" }
        ]
    });
    
    // Radio buttons
    const preferenciaContato = LIB_IHM.Entrada.radio({
        rotulo: "Preferência de contato",
        nome: "preferencia-contato",
        opcoes: [
            { rotulo: "E-mail", valor: "email", marcado: true },
            { rotulo: "Telefone", valor: "telefone" },
            { rotulo: "WhatsApp", valor: "whatsapp" }
        ]
    });
    
    // Checkbox
    const newsletter = LIB_IHM.Entrada.checkbox({
        rotulo: "Desejo receber a newsletter",
        id: "newsletter",
        marcado: false
    });
    
    // Textarea (customizado usando o componente de texto)
    const containerMensagem = document.createElement('div');
    containerMensagem.className = 'lib-ihm-container-entrada';
    
    const rotuloMensagem = document.createElement('label');
    rotuloMensagem.className = 'lib-ihm-rotulo-entrada';
    rotuloMensagem.htmlFor = "mensagem";
    rotuloMensagem.textContent = "Mensagem";
    
    const mensagem = document.createElement('textarea');
    mensagem.className = 'lib-ihm-entrada';
    mensagem.id = "mensagem";
    mensagem.rows = 4;
    mensagem.required = true;
    
    containerMensagem.appendChild(rotuloMensagem);
    containerMensagem.appendChild(mensagem);
    
    // Adicionar todos ao formulário
    container.appendChild(nome);
    container.appendChild(email);
    container.appendChild(dataNascimento);
    container.appendChild(assunto);
    container.appendChild(preferenciaContato);
    container.appendChild(newsletter);
    container.appendChild(containerMensagem);
    
    // Configurar envio do formulário
    const formulario = document.getElementById('formulario-contato');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar e processar formulário
        const dados = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            dataNascimento: document.getElementById('data-nascimento').value,
            assunto: document.getElementById('assunto').value,
            preferenciaContato: document.querySelector('input[name="preferencia-contato"]:checked')?.value,
            newsletter: document.getElementById('newsletter').checked,
            mensagem: document.getElementById('mensagem').value
        };
        
        console.log("Dados do formulário:", dados);
        alert("Formulário enviado com sucesso!");
        formulario.reset();
    });
}

// Adicione estas funções ao app.js

function inicializarNavbar() {
    const navbar = LIB_IHM.BarraNavegacao.criar({
        titulo: "LIB_IHM",
        fixo: true,
        links: [
            { texto: "Início", url: "#" },
            { texto: "Componentes", url: "#" },
            { texto: "Documentação", url: "#" },
            { texto: "Contato", url: "#" }
        ]
    });
    
    document.body.insertBefore(navbar, document.body.firstChild);
}

function inicializarBreadcrumb() {
    const breadcrumb = LIB_IHM.Breadcrumb.criar([
        { texto: "Início", url: "#" },
        { texto: "Documentação", url: "#" },
        { texto: "Componentes", url: "#" }
    ]);
    
    const main = document.querySelector('main');
    main.insertBefore(breadcrumb, main.firstChild);
}

function inicializarTabela() {
    const tabela = LIB_IHM.Tabela.criar({
        colunas: [
            { titulo: "Nome", chave: "nome" },
            { titulo: "Idade", chave: "idade" },
            { titulo: "Cargo", chave: "cargo" }
        ],
        dados: [
            { nome: "João Silva", idade: 32, cargo: "Desenvolvedor" },
            { nome: "Maria Souza", idade: 28, cargo: "Designer" },
            { nome: "Carlos Oliveira", idade: 45, cargo: "Gerente" }
        ],
        ordenavel: true
    });
    
    const secao = document.createElement('section');
    secao.className = 'secao';
    secao.innerHTML = '<h2>Tabela de Dados</h2>';
    secao.appendChild(tabela);
    
    document.querySelector('main').appendChild(secao);
}

function inicializarTabs() {
    const tabs = LIB_IHM.Tabs.criar([
        { 
            titulo: "Informações", 
            conteudo: "<p>Conteúdo da aba de informações.</p>" 
        },
        { 
            titulo: "Configurações", 
            conteudo: "<p>Conteúdo da aba de configurações.</p>" 
        },
        { 
            titulo: "Ajuda", 
            conteudo: "<p>Conteúdo da aba de ajuda.</p>" 
        }
    ]);
    
    const secao = document.createElement('section');
    secao.className = 'secao';
    secao.innerHTML = '<h2>Abas (Tabs)</h2>';
    secao.appendChild(tabs);
    
    document.querySelector('main').appendChild(secao);
}

function inicializarGrupoBotoes() {
    const grupo = LIB_IHM.GrupoBotoes.criar([
        { texto: "Salvar", variante: "primario" },
        { texto: "Cancelar", variante: "secundario" },
        { texto: "Excluir", variante: "perigo" }
    ], 'horizontal');
    
    const secao = document.createElement('section');
    secao.className = 'secao';
    secao.innerHTML = '<h2>Grupo de Botões</h2>';
    secao.appendChild(grupo);
    
    document.querySelector('main').appendChild(secao);
}

// Atualize a função DOMContentLoaded para chamar as novas funções
document.addEventListener('DOMContentLoaded', function() {
    LIB_IHM.configurar({
        tema: 'claro',
        corPrimaria: '#4285f4',
        bordaArredondada: '8px'
    });


});