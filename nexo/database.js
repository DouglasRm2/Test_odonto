// ======================================
// NEXO RELACIONAMENTO
// Banco de Dados Local (IndexedDB)
// ======================================

let banco = null;

// --------------------------------------
// Inicializar Banco
// --------------------------------------

function iniciarBanco() {

    log("Inicializando banco local...");

    const request = indexedDB.open(
        DATABASE.nome,
        DATABASE.versao
    );

    request.onupgradeneeded = function (event) {

        banco = event.target.result;

        criarTabelas();

    };

    request.onsuccess = function (event) {

        banco = event.target.result;

        log("Banco iniciado com sucesso.");

        // Carrega os serviços do servidor ou cache
        carregarServicos();

        // Sincroniza registros pendentes
        sincronizarPendentes();

    };

    request.onerror = function (event) {

        console.error("Erro ao abrir o banco:", event.target.error);

    };

}

// --------------------------------------
// Criar Tabelas
// --------------------------------------

function criarTabelas() {

    // Tabela de cadastros pendentes

    if (!banco.objectStoreNames.contains(DATABASE.tabelas.pendentes)) {

        banco.createObjectStore(
            DATABASE.tabelas.pendentes,
            {
                keyPath: "id",
                autoIncrement: true
            }
        );

        log("Tabela Pendentes criada.");

    }

    // Cache dos serviços

    if (!banco.objectStoreNames.contains(DATABASE.tabelas.servicos)) {

        banco.createObjectStore(
            DATABASE.tabelas.servicos,
            {
                keyPath: "nome"
            }
        );

        log("Tabela Serviços criada.");

    }

}

// --------------------------------------
// Retorna uma tabela
// --------------------------------------

function obterTabela(nomeTabela, modo = "readonly") {

    if (!banco) {

        throw new Error("Banco ainda não foi iniciado.");

    }

    return banco
        .transaction(nomeTabela, modo)
        .objectStore(nomeTabela);

}

// --------------------------------------
// Verifica se o banco está disponível
// --------------------------------------

function bancoPronto() {

    return banco !== null;

}