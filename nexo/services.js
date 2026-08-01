// ======================================
// NEXO RELACIONAMENTO
// Serviços da Clínica
// ======================================

// --------------------------------------
// Carregar Serviços
// --------------------------------------

function carregarServicos() {

    log("Carregando serviços...");

    // Sem internet → usa cache
    if (!navigator.onLine) {

        log("Modo Offline");

        carregarServicosCache();

        return;

    }

    // Busca na API
    buscarServicos()

    .then(lista => {

        preencherSelectServicos(lista);

        salvarServicosCache(lista);

    })

    .catch(() => {

        carregarServicosCache();

    });

}

// --------------------------------------
// Salvar Cache
// --------------------------------------

function salvarServicosCache(lista) {

    const tabela = obterTabela(
        DATABASE.tabelas.servicos,
        "readwrite"
    );

    tabela.clear();

    lista.forEach(servico => {

        tabela.add({

            nome: servico

        });

    });

}

// --------------------------------------
// Carregar Cache
// --------------------------------------

function carregarServicosCache() {

    const tabela = obterTabela(
        DATABASE.tabelas.servicos
    );

    const request = tabela.getAll();

    request.onsuccess = function () {

        const lista = request.result.map(item => item.nome);

        preencherSelectServicos(lista);

        mostrar("Modo Offline", "ok");

        log("Serviços carregados do cache.");

    };

}

// --------------------------------------
// Preencher Select
// --------------------------------------

function preencherSelectServicos(lista) {

    select.innerHTML = "";

    select.appendChild(

        new Option(
            "Selecione...",
            ""
        )

    );

    lista.forEach(servico => {

        select.appendChild(

            new Option(
                servico,
                servico
            )

        );

    });

    select.disabled = false;

}

// --------------------------------------
// Atualizar Serviços
// --------------------------------------

function atualizarServicos() {

    carregarServicos();

}