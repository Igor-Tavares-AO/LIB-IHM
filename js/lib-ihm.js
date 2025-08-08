// lib_ihm.js
const LIB_IHM = (function() {
    // Configurações padrão
    const padroes = {
        tema: 'claro',
        corPrimaria: '#4285f4',
        corSecundaria: '#f1f8fe',
        bordaArredondada: '8px',
        fonteFamilia: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        velocidadeTransicao: '0.3s'
    };
    
    let config = {...padroes};
    
    // Função para atualizar configurações
    const configurar = (novaConfig) => {
        config = {...config, ...novaConfig};
        atualizarEstilosGlobais();
    };
    
    // Aplicar estilos globais
    const atualizarEstilosGlobais = () => {
        const idEstilo = 'lib-ihm-estilos-globais';
        let elementoEstilo = document.getElementById(idEstilo);
        
        if (!elementoEstilo) {
            elementoEstilo = document.createElement('style');
            elementoEstilo.id = idEstilo;
            document.head.appendChild(elementoEstilo);
        }
        
        elementoEstilo.textContent = `
            :root {
                --lib-ihm-primaria: ${config.corPrimaria};
                --lib-ihm-secundaria: ${config.corSecundaria};
                --lib-ihm-borda-arredondada: ${config.bordaArredondada};
                --lib-ihm-fonte-familia: ${config.fonteFamilia};
                --lib-ihm-transicao: ${config.velocidadeTransicao};
            }
        `;
    };
    
    // Inicializar estilos globais
    atualizarEstilosGlobais();
    
    // Componente Card
    const Card = {
        /**
         * Cria um componente Card
         * @param {Object} opcoes - Configurações do card
         * @param {string} opcoes.titulo - Título do card
         * @param {string} opcoes.conteudo - Conteúdo do card
         * @param {string} opcoes.imagem - URL da imagem (opcional)
         * @param {string} opcoes.rodape - Rodapé do card (opcional)
         * @param {boolean} opcoes.efeitoHover - Efeito hover (padrão: true)
         * @param {string} opcoes.largura - Largura do card (padrão: '100%')
         * @param {function} opcoes.aoClicar - Função de callback para clique
         * @returns {HTMLElement} Elemento do card
         */
        criar: function(opcoes) {
            const padroesCard = {
                efeitoHover: true,
                largura: '100%',
                aoClicar: null
            };
            
            const configuracao = {...padroesCard, ...opcoes};
            
            const card = document.createElement('div');
            card.className = 'lib-ihm-card';
            
            if (configuracao.efeitoHover) card.classList.add('lib-ihm-card-hover');
            card.style.width = configuracao.largura;
            
            // Imagem (se fornecida)
            if (configuracao.imagem) {
                const containerImagem = document.createElement('div');
                containerImagem.className = 'lib-ihm-card-container-imagem';
                
                const img = document.createElement('img');
                img.src = configuracao.imagem;
                img.alt = configuracao.titulo || 'Imagem do card';
                img.className = 'lib-ihm-card-imagem';
                
                containerImagem.appendChild(img);
                card.appendChild(containerImagem);
            }
            
            // Corpo do card
            const corpo = document.createElement('div');
            corpo.className = 'lib-ihm-card-corpo';
            
            // Título
            if (configuracao.titulo) {
                const titulo = document.createElement('h3');
                titulo.className = 'lib-ihm-card-titulo';
                titulo.textContent = configuracao.titulo;
                corpo.appendChild(titulo);
            }
            
            // Conteúdo
            if (configuracao.conteudo) {
                const conteudo = document.createElement('div');
                conteudo.className = 'lib-ihm-card-conteudo';
                conteudo.innerHTML = configuracao.conteudo;
                corpo.appendChild(conteudo);
            }
            
            card.appendChild(corpo);
            
            // Rodapé (se fornecido)
            if (configuracao.rodape) {
                const rodape = document.createElement('div');
                rodape.className = 'lib-ihm-card-rodape';
                rodape.innerHTML = configuracao.rodape;
                card.appendChild(rodape);
            }
            
            // Evento de clique
            if (configuracao.aoClicar && typeof configuracao.aoClicar === 'function') {
                card.style.cursor = 'pointer';
                card.addEventListener('click', configuracao.aoClicar);
            }
            
            return card;
        },
        
        /**
         * Cria um Card com Botão
         * @param {Object} opcoes - Configurações do card
         * @param {string} opcoes.textoBotao - Texto do botão
         * @param {function} opcoes.aoClicarBotao - Callback do botão
         * @param {string} opcoes.varianteBotao - Estilo do botão (primario, secundario, perigo)
         * @returns {HTMLElement} Elemento do card com botão
         */
        comBotao: function(opcoes) {
            const card = this.criar(opcoes);
            
            const containerBotao = document.createElement('div');
            containerBotao.className = 'lib-ihm-card-container-botao';
            
            const botao = document.createElement('button');
            botao.className = `lib-ihm-botao lib-ihm-botao-${opcoes.varianteBotao || 'primario'}`;
            botao.textContent = opcoes.textoBotao || 'Clique aqui';
            
            if (opcoes.aoClicarBotao && typeof opcoes.aoClicarBotao === 'function') {
                botao.addEventListener('click', (e) => {
                    e.stopPropagation();
                    opcoes.aoClicarBotao();
                });
            }
            
            containerBotao.appendChild(botao);
            
            if (opcoes.rodape) {
                card.insertBefore(containerBotao, card.lastChild);
            } else {
                card.appendChild(containerBotao);
            }
            
            return card;
        }
    };
    
    // Componente Entrada
    const Entrada = {
        /**
         * Cria um campo de texto
         * @param {Object} opcoes - Configurações do input
         * @param {string} opcoes.rotulo - Rótulo do campo
         * @param {string} opcoes.placeholder - Placeholder
         * @param {string} opcoes.valor - Valor inicial
         * @param {string} opcoes.id - ID do elemento
         * @param {boolean} opcoes.obrigatorio - Campo obrigatório
         * @param {function} opcoes.aoMudar - Callback de mudança
         * @returns {HTMLElement} Container do input
         */
        texto: function(opcoes) {
            const container = document.createElement('div');
            container.className = 'lib-ihm-container-entrada';
            
            if (opcoes.rotulo) {
                const rotulo = document.createElement('label');
                rotulo.className = 'lib-ihm-rotulo-entrada';
                rotulo.htmlFor = opcoes.id || '';
                rotulo.textContent = opcoes.rotulo;
                container.appendChild(rotulo);
            }
            
            const entrada = document.createElement('input');
            entrada.type = 'text';
            entrada.className = 'lib-ihm-entrada lib-ihm-entrada-texto';
            entrada.placeholder = opcoes.placeholder || '';
            entrada.value = opcoes.valor || '';
            entrada.id = opcoes.id || '';
            entrada.required = opcoes.obrigatorio || false;
            
            if (opcoes.aoMudar && typeof opcoes.aoMudar === 'function') {
                entrada.addEventListener('input', (e) => opcoes.aoMudar(e.target.value));
            }
            
            container.appendChild(entrada);
            return container;
        },
        
        /**
         * Cria um campo de data
         * @param {Object} opcoes - Configurações do input
         * @returns {HTMLElement} Container do input
         */
        data: function(opcoes) {
            const container = document.createElement('div');
            container.className = 'lib-ihm-container-entrada';
            
            if (opcoes.rotulo) {
                const rotulo = document.createElement('label');
                rotulo.className = 'lib-ihm-rotulo-entrada';
                rotulo.htmlFor = opcoes.id || '';
                rotulo.textContent = opcoes.rotulo;
                container.appendChild(rotulo);
            }
            
            const entrada = document.createElement('input');
            entrada.type = 'date';
            entrada.className = 'lib-ihm-entrada lib-ihm-entrada-data';
            entrada.value = opcoes.valor || '';
            entrada.id = opcoes.id || '';
            entrada.required = opcoes.obrigatorio || false;
            
            if (opcoes.aoMudar && typeof opcoes.aoMudar === 'function') {
                entrada.addEventListener('change', (e) => opcoes.aoMudar(e.target.value));
            }
            
            container.appendChild(entrada);
            return container;
        },
        
        /**
         * Cria um checkbox
         * @param {Object} opcoes - Configurações do checkbox
         * @returns {HTMLElement} Container do checkbox
         */
        checkbox: function(opcoes) {
            const container = document.createElement('div');
            container.className = 'lib-ihm-container-checkbox';
            
            const rotulo = document.createElement('label');
            rotulo.className = 'lib-ihm-rotulo-checkbox';
            
            const entrada = document.createElement('input');
            entrada.type = 'checkbox';
            entrada.className = 'lib-ihm-checkbox';
            entrada.checked = opcoes.marcado || false;
            entrada.id = opcoes.id || '';
            
            if (opcoes.aoMudar && typeof opcoes.aoMudar === 'function') {
                entrada.addEventListener('change', (e) => opcoes.aoMudar(e.target.checked));
            }
            
            const span = document.createElement('span');
            span.className = 'lib-ihm-checkbox-personalizado';
            
            const textoSpan = document.createElement('span');
            textoSpan.className = 'lib-ihm-checkbox-texto';
            textoSpan.textContent = opcoes.rotulo || '';
            
            rotulo.appendChild(entrada);
            rotulo.appendChild(span);
            rotulo.appendChild(textoSpan);
            container.appendChild(rotulo);
            
            return container;
        },
        
        /**
         * Cria um grupo de radio buttons
         * @param {Object} opcoes - Configurações do grupo
         * @returns {HTMLElement} Container dos radios
         */
        radio: function(opcoes) {
            const container = document.createElement('div');
            container.className = 'lib-ihm-grupo-radio';
            
            if (opcoes.rotulo) {
                const rotuloGrupo = document.createElement('div');
                rotuloGrupo.className = 'lib-ihm-rotulo-grupo-radio';
                rotuloGrupo.textContent = opcoes.rotulo;
                container.appendChild(rotuloGrupo);
            }
            
            opcoes.opcoes.forEach((opcaoRadio, index) => {
                const idRadio = `${opcoes.nome || 'radio'}-${index}`;
                
                const containerRadio = document.createElement('div');
                containerRadio.className = 'lib-ihm-container-radio';
                
                const rotulo = document.createElement('label');
                rotulo.className = 'lib-ihm-rotulo-radio';
                
                const entrada = document.createElement('input');
                entrada.type = 'radio';
                entrada.className = 'lib-ihm-radio';
                entrada.name = opcoes.nome || 'grupo-radio';
                entrada.value = opcaoRadio.valor;
                entrada.id = idRadio;
                entrada.checked = opcaoRadio.marcado || false;
                
                if (opcoes.aoMudar && typeof opcoes.aoMudar === 'function') {
                    entrada.addEventListener('change', (e) => {
                        if (e.target.checked) opcoes.aoMudar(e.target.value);
                    });
                }
                
                const span = document.createElement('span');
                span.className = 'lib-ihm-radio-personalizado';
                
                const textoSpan = document.createElement('span');
                textoSpan.className = 'lib-ihm-radio-texto';
                textoSpan.textContent = opcaoRadio.rotulo;
                
                rotulo.appendChild(entrada);
                rotulo.appendChild(span);
                rotulo.appendChild(textoSpan);
                containerRadio.appendChild(rotulo);
                container.appendChild(containerRadio);
            });
            
            return container;
        },
        
        /**
         * Cria um dropdown (select)
         * @param {Object} opcoes - Configurações do dropdown
         * @returns {HTMLElement} Container do dropdown
         */
        dropdown: function(opcoes) {
            const container = document.createElement('div');
            container.className = 'lib-ihm-container-entrada';
            
            if (opcoes.rotulo) {
                const rotulo = document.createElement('label');
                rotulo.className = 'lib-ihm-rotulo-entrada';
                rotulo.htmlFor = opcoes.id || '';
                rotulo.textContent = opcoes.rotulo;
                container.appendChild(rotulo);
            }
            
            const select = document.createElement('select');
            select.className = 'lib-ihm-entrada lib-ihm-select';
            select.id = opcoes.id || '';
            select.required = opcoes.obrigatorio || false;
            
            if (opcoes.placeholder) {
                const opcaoPlaceholder = document.createElement('option');
                opcaoPlaceholder.value = '';
                opcaoPlaceholder.textContent = opcoes.placeholder;
                opcaoPlaceholder.disabled = true;
                opcaoPlaceholder.selected = true;
                select.appendChild(opcaoPlaceholder);
            }
            
            opcoes.opcoes.forEach(opcao => {
                const option = document.createElement('option');
                option.value = opcao.valor;
                option.textContent = opcao.rotulo;
                option.selected = opcao.selecionado || false;
                select.appendChild(option);
            });
            
            if (opcoes.aoMudar && typeof opcoes.aoMudar === 'function') {
                select.addEventListener('change', (e) => opcoes.aoMudar(e.target.value));
            }
            
            container.appendChild(select);
            return container;
        }
    };
    
    // Componente Carrossel
    const Carrossel = {
        /**
         * Cria um carrossel de imagens
         * @param {Object} opcoes - Configurações do carrossel
         * @param {Array} opcoes.imagens - Array de URLs de imagens
         * @param {number} opcoes.intervalo - Intervalo de transição em ms (opcional)
         * @param {boolean} opcoes.mostrarControles - Mostrar controles (padrão: true)
         * @param {boolean} opcoes.mostrarIndicadores - Mostrar indicadores (padrão: true)
         * @returns {HTMLElement} Elemento do carrossel
         */
        criar: function(opcoes) {
            const carrossel = document.createElement('div');
            carrossel.className = 'lib-ihm-carrossel';
            
            const containerSlides = document.createElement('div');
            containerSlides.className = 'lib-ihm-carrossel-slides';
            
            // Criar slides
            opcoes.imagens.forEach((img, index) => {
                const slide = document.createElement('div');
                slide.className = 'lib-ihm-carrossel-slide';
                slide.dataset.index = index;
                
                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.alt = `Slide ${index + 1}`;
                
                slide.appendChild(imgElement);
                containerSlides.appendChild(slide);
            });
            
            carrossel.appendChild(containerSlides);
            
            // Controles (anterior/próximo)
            if (opcoes.mostrarControles !== false) {
                const botaoAnterior = document.createElement('button');
                botaoAnterior.className = 'lib-ihm-carrossel-controle lib-ihm-carrossel-anterior';
                botaoAnterior.innerHTML = '&lt;';
                botaoAnterior.addEventListener('click', () => this.slideAnterior(carrossel));
                
                const botaoProximo = document.createElement('button');
                botaoProximo.className = 'lib-ihm-carrossel-controle lib-ihm-carrossel-proximo';
                botaoProximo.innerHTML = '&gt;';
                botaoProximo.addEventListener('click', () => this.proximoSlide(carrossel));
                
                carrossel.appendChild(botaoAnterior);
                carrossel.appendChild(botaoProximo);
            }
            
            // Indicadores
            if (opcoes.mostrarIndicadores !== false) {
                const indicadores = document.createElement('div');
                indicadores.className = 'lib-ihm-carrossel-indicadores';
                
                opcoes.imagens.forEach((_, index) => {
                    const indicador = document.createElement('button');
                    indicador.className = 'lib-ihm-carrossel-indicador';
                    indicador.dataset.index = index;
                    indicador.addEventListener('click', () => this.irParaSlide(carrossel, index));
                    
                    indicadores.appendChild(indicador);
                });
                
                carrossel.appendChild(indicadores);
            }
            
            // Inicializar
            this.irParaSlide(carrossel, 0);
            
            // Auto-rotacionar se intervalo for definido
            if (opcoes.intervalo) {
                let idIntervalo = setInterval(() => this.proximoSlide(carrossel), opcoes.intervalo);
                
                // Pausar ao passar o mouse
                carrossel.addEventListener('mouseenter', () => clearInterval(idIntervalo));
                carrossel.addEventListener('mouseleave', () => {
                    idIntervalo = setInterval(() => this.proximoSlide(carrossel), opcoes.intervalo);
                });
            }
            
            return carrossel;
        },
        
        slideAnterior: function(carrossel) {
            const slides = carrossel.querySelector('.lib-ihm-carrossel-slides');
            const slideAtivo = slides.querySelector('.lib-ihm-carrossel-slide.ativo');
            const totalSlides = slides.children.length;
            let indiceAtual = slideAtivo ? parseInt(slideAtivo.dataset.index) : 0;
            
            const indiceAnterior = (indiceAtual - 1 + totalSlides) % totalSlides;
            this.irParaSlide(carrossel, indiceAnterior);
        },
        
        proximoSlide: function(carrossel) {
            const slides = carrossel.querySelector('.lib-ihm-carrossel-slides');
            const slideAtivo = slides.querySelector('.lib-ihm-carrossel-slide.ativo');
            const totalSlides = slides.children.length;
            let indiceAtual = slideAtivo ? parseInt(slideAtivo.dataset.index) : 0;
            
            const proximoIndice = (indiceAtual + 1) % totalSlides;
            this.irParaSlide(carrossel, proximoIndice);
        },
        
        irParaSlide: function(carrossel, indice) {
            const slides = carrossel.querySelector('.lib-ihm-carrossel-slides');
            const indicadores = carrossel.querySelector('.lib-ihm-carrossel-indicadores');
            
            // Atualizar slides
            Array.from(slides.children).forEach((slide, i) => {
                slide.classList.toggle('ativo', i === indice);
            });
            
            // Atualizar indicadores
            if (indicadores) {
                Array.from(indicadores.children).forEach((indicador, i) => {
                    indicador.classList.toggle('ativo', i === indice);
                });
            }
        }
    };
    // Adicione isso ao objeto LIB_IHM, antes do return final

    // Componente Botão
    const Botao = {
    /**
     * Cria um botão estilizado
     * @param {Object} opcoes - Configurações do botão
     * @param {string} opcoes.texto - Texto do botão
     * @param {string} opcoes.variante - Estilo (primario, secundario, perigo)
     * @param {function} opcoes.aoClicar - Callback de clique
     * @param {string} opcoes.icone - Ícone opcional (código HTML ou texto)
     * @returns {HTMLButtonElement} Elemento do botão
     */
    criar: function(opcoes) {
        const botao = document.createElement('button');
        botao.className = `lib-ihm-botao lib-ihm-botao-${opcoes.variante || 'primario'}`;
        botao.textContent = opcoes.texto || 'Botão';
        
        if (opcoes.icone) {
            botao.innerHTML = `${opcoes.icone} ${botao.textContent}`;
        }
        
        if (opcoes.aoClicar && typeof opcoes.aoClicar === 'function') {
            botao.addEventListener('click', opcoes.aoClicar);
        }
        
        return botao;
    }
};

// Componente Grupo de Botões
const GrupoBotoes = {
    /**
     * Cria um grupo de botões
     * @param {Array} botoes - Array de configurações de botões
     * @param {string} direcao - horizontal ou vertical
     * @returns {HTMLElement} Container do grupo
     */
    criar: function(botoes, direcao = 'horizontal') {
        const container = document.createElement('div');
        container.className = `lib-ihm-grupo-botoes ${direcao}`;
        
        botoes.forEach(config => {
            const botao = Botao.criar(config);
            container.appendChild(botao);
        });
        
        return container;
    }
};

// Componente Tabela
const Tabela = {
    /**
     * Cria uma tabela estilizada
     * @param {Object} opcoes - Configurações da tabela
     * @param {Array} opcoes.colunas - Nomes das colunas
     * @param {Array} opcoes.dados - Array de objetos com os dados
     * @param {boolean} opcoes.ordenavel - Se permite ordenação
     * @returns {HTMLTableElement} Elemento da tabela
     */
    criar: function(opcoes) {
        const tabela = document.createElement('table');
        tabela.className = 'lib-ihm-tabela';
        
        // Cabeçalho
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        
        opcoes.colunas.forEach(coluna => {
            const th = document.createElement('th');
            th.textContent = coluna.titulo;
            if (opcoes.ordenavel) {
                th.style.cursor = 'pointer';
                th.addEventListener('click', () => ordenarTabela(coluna.chave));
            }
            trHead.appendChild(th);
        });
        
        thead.appendChild(trHead);
        tabela.appendChild(thead);
        
        // Corpo
        const tbody = document.createElement('tbody');
        tabela.appendChild(tbody);
        
        // Função para atualizar dados
        const atualizarDados = (dados) => {
            tbody.innerHTML = '';
            dados.forEach(linha => {
                const tr = document.createElement('tr');
                opcoes.colunas.forEach(coluna => {
                    const td = document.createElement('td');
                    td.textContent = linha[coluna.chave];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        };
        
        // Ordenação
        const ordenarTabela = (chave) => {
            const dadosOrdenados = [...opcoes.dados].sort((a, b) => {
                if (a[chave] < b[chave]) return -1;
                if (a[chave] > b[chave]) return 1;
                return 0;
            });
            atualizarDados(dadosOrdenados);
        };
        
        // Inicializar com dados
        atualizarDados(opcoes.dados);
        
        return tabela;
    }
};

// Componente Breadcrumb
const Breadcrumb = {
    /**
     * Cria um breadcrumb de navegação
     * @param {Array} itens - Array de objetos {texto, url}
     * @returns {HTMLElement} Elemento do breadcrumb
     */
    criar: function(itens) {
        const nav = document.createElement('nav');
        nav.className = 'lib-ihm-breadcrumb';
        
        const ol = document.createElement('ol');
        
        itens.forEach((item, index) => {
            const li = document.createElement('li');
            
            if (index === itens.length - 1) {
                li.className = 'ativo';
                li.textContent = item.texto;
            } else {
                const a = document.createElement('a');
                a.href = item.url;
                a.textContent = item.texto;
                li.appendChild(a);
            }
            
            ol.appendChild(li);
        });
        
        nav.appendChild(ol);
        return nav;
    }
};

// Componente Barra de Navegação
const BarraNavegacao = {
    /**
     * Cria uma barra de navegação
     * @param {Object} opcoes - Configurações da barra
     * @param {string} opcoes.titulo - Título da barra
     * @param {Array} opcoes.links - Array de links
     * @param {boolean} opcoes.fixo - Se fixa no topo
     * @returns {HTMLElement} Elemento da barra
     */
    criar: function(opcoes) {
        const nav = document.createElement('nav');
        nav.className = `lib-ihm-navbar ${opcoes.fixo ? 'fixo' : ''}`;
        
        const container = document.createElement('div');
        container.className = 'lib-ihm-navbar-container';
        
        // Título
        const titulo = document.createElement('div');
        titulo.className = 'lib-ihm-navbar-titulo';
        titulo.textContent = opcoes.titulo;
        container.appendChild(titulo);
        
        // Links
        const ul = document.createElement('ul');
        ul.className = 'lib-ihm-navbar-links';
        
        opcoes.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.texto;
            
            if (link.icone) {
                a.innerHTML = `${link.icone} ${a.textContent}`;
            }
            
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
        nav.appendChild(container);
        
        return nav;
    }
};

// Componente Tabs
const Tabs = {
    /**
     * Cria um componente de abas
     * @param {Array} abas - Array de objetos {titulo, conteudo}
     * @returns {HTMLElement} Container das abas
     */
    criar: function(abas) {
        const container = document.createElement('div');
        container.className = 'lib-ihm-tabs';
        
        // Cabeçalho das abas
        const header = document.createElement('div');
        header.className = 'lib-ihm-tabs-header';
        
        // Conteúdo das abas
        const content = document.createElement('div');
        content.className = 'lib-ihm-tabs-content';
        
        abas.forEach((aba, index) => {
            // Botão da aba
            const botao = document.createElement('button');
            botao.className = `lib-ihm-tabs-botao ${index === 0 ? 'ativo' : ''}`;
            botao.textContent = aba.titulo;
            botao.addEventListener('click', () => {
                // Atualizar botões ativos
                header.querySelectorAll('.lib-ihm-tabs-botao').forEach(btn => {
                    btn.classList.remove('ativo');
                });
                botao.classList.add('ativo');
                
                // Atualizar conteúdo visível
                content.querySelectorAll('.lib-ihm-tabs-painel').forEach(painel => {
                    painel.style.display = 'none';
                });
                content.children[index].style.display = 'block';
            });
            header.appendChild(botao);
            
            // Painel de conteúdo
            const painel = document.createElement('div');
            painel.className = 'lib-ihm-tabs-painel';
            painel.style.display = index === 0 ? 'block' : 'none';
            painel.innerHTML = aba.conteudo;
            content.appendChild(painel);
        });
        
        container.appendChild(header);
        container.appendChild(content);
        
        return container;
    }
};

// Atualize o return final para incluir os novos componentes
return {
    configurar,
    Card,
    Entrada,
    Carrossel,
    Botao,
    GrupoBotoes,
    Tabela,
    Breadcrumb,
    BarraNavegacao,
    Tabs
    };

})();

// Estilos CSS que devem ser adicionados ao documento
(function() {
    const estilo = document.createElement('style');
    estilo.textContent = `
        /* Estilos base */
        :root {
            --lib-ihm-primaria: #4285f4;
            --lib-ihm-primaria-escura: #3367d6;
            --lib-ihm-secundaria: #f1f8fe;
            --lib-ihm-perigo: #dc3545;
            --lib-ihm-perigo-escura: #bb2d3b;
            --lib-ihm-borda-arredondada: 8px;
            --lib-ihm-fonte-familia: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --lib-ihm-transicao: 0.3s;
            --lib-ihm-cor-texto: #333;
            --lib-ihm-cor-texto-clara: #666;
            --lib-ihm-cor-borda: #ddd;
            --lib-ihm-cor-fundo: #fff;
            --lib-ihm-cor-fundo-hover: #f8f9fa;
        }
        
        [data-tema="escuro"] {
            --lib-ihm-cor-texto: #f8f9fa;
            --lib-ihm-cor-texto-clara: #dee2e6;
            --lib-ihm-cor-borda: #495057;
            --lib-ihm-cor-fundo: #343a40;
            --lib-ihm-cor-fundo-hover: #495057;
            --lib-ihm-secundaria: #212529;
        }
        
        /* Estilos do Card */
        .lib-ihm-card {
            font-family: var(--lib-ihm-fonte-familia);
            border-radius: var(--lib-ihm-borda-arredondada);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            background: var(--lib-ihm-cor-fundo);
            transition: all var(--lib-ihm-transicao) ease;
            margin: 10px;
            display: flex;
            flex-direction: column;
            color: var(--lib-ihm-cor-texto);
        }
        
        .lib-ihm-card-hover:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }
        
        .lib-ihm-card-container-imagem {
            width: 100%;
            overflow: hidden;
        }
        
        .lib-ihm-card-imagem {
            width: 100%;
            height: auto;
            display: block;
            transition: transform var(--lib-ihm-transicao) ease;
        }
        
        .lib-ihm-card-hover:hover .lib-ihm-card-imagem {
            transform: scale(1.05);
        }
        
        .lib-ihm-card-corpo {
            padding: 16px;
            flex-grow: 1;
        }
        
        .lib-ihm-card-titulo {
            margin: 0 0 10px 0;
            color: var(--lib-ihm-cor-texto);
            font-size: 1.2em;
        }
        
        .lib-ihm-card-conteudo {
            color: var(--lib-ihm-cor-texto-clara);
            line-height: 1.5;
        }
        
        .lib-ihm-card-rodape {
            padding: 12px 16px;
            background-color: var(--lib-ihm-secundaria);
            border-top: 1px solid var(--lib-ihm-cor-borda);
            font-size: 0.9em;
            color: var(--lib-ihm-cor-texto-clara);
        }
        
        .lib-ihm-card-container-botao {
            padding: 12px 16px;
            background-color: var(--lib-ihm-secundaria);
            border-top: 1px solid var(--lib-ihm-cor-borda);
            display: flex;
            justify-content: flex-end;
        }
        
        /* Estilos de Botão */
        .lib-ihm-botao {
            font-family: var(--lib-ihm-fonte-familia);
            border: none;
            border-radius: var(--lib-ihm-borda-arredondada);
            padding: 8px 16px;
            font-size: 0.9em;
            cursor: pointer;
            transition: all var(--lib-ihm-transicao) ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .lib-ihm-botao-primario {
            background-color: var(--lib-ihm-primaria);
            color: white;
        }
        
        .lib-ihm-botao-primario:hover {
            background-color: var(--lib-ihm-primaria-escura);
        }
        
        .lib-ihm-botao-secundario {
            background-color: var(--lib-ihm-secundaria);
            color: var(--lib-ihm-cor-texto);
            border: 1px solid var(--lib-ihm-cor-borda);
        }
        
        .lib-ihm-botao-secundario:hover {
            background-color: var(--lib-ihm-cor-fundo-hover);
        }
        
        .lib-ihm-botao-perigo {
            background-color: var(--lib-ihm-perigo);
            color: white;
        }
        
        .lib-ihm-botao-perigo:hover {
            background-color: var(--lib-ihm-perigo-escura);
        }
        
        /* Estilos de Entrada */
        .lib-ihm-container-entrada {
            margin-bottom: 16px;
            width: 100%;
        }
        
        .lib-ihm-rotulo-entrada {
            display: block;
            margin-bottom: 6px;
            font-size: 0.9em;
            color: var(--lib-ihm-cor-texto);
            font-weight: 500;
        }
        
        .lib-ihm-entrada {
            font-family: var(--lib-ihm-fonte-familia);
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--lib-ihm-cor-borda);
            border-radius: var(--lib-ihm-borda-arredondada);
            font-size: 0.9em;
            transition: all var(--lib-ihm-transicao) ease;
            background-color: var(--lib-ihm-cor-fundo);
            color: var(--lib-ihm-cor-texto);
        }
        
        .lib-ihm-entrada:focus {
            outline: none;
            border-color: var(--lib-ihm-primaria);
            box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
        }
        
        .lib-ihm-select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 1em;
        }
        
        /* Checkbox e Radio */
        .lib-ihm-container-checkbox, 
        .lib-ihm-container-radio {
            margin-bottom: 12px;
        }
        
        .lib-ihm-rotulo-checkbox, 
        .lib-ihm-rotulo-radio {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding-left: 28px;
            min-height: 20px;
        }
        
        .lib-ihm-checkbox, 
        .lib-ihm-radio {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }
        
        .lib-ihm-checkbox-personalizado, 
        .lib-ihm-radio-personalizado {
            position: absolute;
            left: 0;
            width: 20px;
            height: 20px;
            border: 1px solid var(--lib-ihm-cor-borda);
            border-radius: 3px;
            background-color: var(--lib-ihm-cor-fundo);
            transition: all var(--lib-ihm-transicao) ease;
        }
        
        .lib-ihm-radio-personalizado {
            border-radius: 50%;
        }
        
        .lib-ihm-checkbox:checked ~ .lib-ihm-checkbox-personalizado,
        .lib-ihm-radio:checked ~ .lib-ihm-radio-personalizado {
            background-color: var(--lib-ihm-primaria);
            border-color: var(--lib-ihm-primaria);
        }
        
        .lib-ihm-checkbox-personalizado:after, 
        .lib-ihm-radio-personalizado:after {
            content: "";
            position: absolute;
            display: none;
        }
        
        .lib-ihm-checkbox:checked ~ .lib-ihm-checkbox-personalizado:after,
        .lib-ihm-radio:checked ~ .lib-ihm-radio-personalizado:after {
            display: block;
        }
        
        .lib-ihm-checkbox-personalizado:after {
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
        
        .lib-ihm-radio-personalizado:after {
            left: 5px;
            top: 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
        
        .lib-ihm-checkbox-texto, 
        .lib-ihm-radio-texto {
            margin-left: 8px;
            color: var(--lib-ihm-cor-texto);
        }
        
        .lib-ihm-rotulo-grupo-radio {
            font-size: 0.9em;
            color: var(--lib-ihm-cor-texto);
            font-weight: 500;
            margin-bottom: 6px;
        }
        
        /* Carrossel */
        .lib-ihm-carrossel {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: var(--lib-ihm-borda-arredondada);
        }
        
        .lib-ihm-carrossel-slides {
            display: flex;
            transition: transform var(--lib-ihm-transicao) ease;
            height: 100%;
        }
        
        .lib-ihm-carrossel-slide {
            min-width: 100%;
            position: relative;
            display: none;
        }
        
        .lib-ihm-carrossel-slide.ativo {
            display: block;
        }
        
        .lib-ihm-carrossel-slide img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .lib-ihm-carrossel-controle {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all var(--lib-ihm-transicao) ease;
        }
        
        .lib-ihm-carrossel-controle:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .lib-ihm-carrossel-anterior {
            left: 15px;
        }
        
        .lib-ihm-carrossel-proximo {
            right: 15px;
        }
        
        .lib-ihm-carrossel-indicadores {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
        }
        
        .lib-ihm-carrossel-indicador {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            padding: 0;
            transition: all var(--lib-ihm-transicao) ease;
        }
        
        .lib-ihm-carrossel-indicador.ativo {
            background-color: white;
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(estilo);
})();