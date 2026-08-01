// ======================================
// NEXO RELACIONAMENTO
// Gerenciamento Offline
// ======================================

// --------------------------------------
// Salvar Cadastro Offline
// --------------------------------------

function salvarOffline(dados) {

    if (!bancoPronto()) {

        console.error("Banco ainda não iniciado.");

        return;

    }

    const tabela = obterTabela(
        DATABASE.tabelas.pendentes,
        "readwrite"
    );

    tabela.add({

        dados: dados,

        data: new Date()

    });

    log("Cadastro salvo offline.");

}

// --------------------------------------
// Sincronizar Cadastros Pendentes
// --------------------------------------

async function sincronizarPendentes() {

    if (!navigator.onLine) {

        log("Sem internet.");

        return;

    }

    if (!bancoPronto()) {

        return;

    }

    const tabela = obterTabela(
        DATABASE.tabelas.pendentes
    );

    const request = tabela.getAll();

    request.onsuccess = async function () {

        const lista = request.result;

        log(`${lista.length} cadastro(s) pendente(s).`);

        for (const item of lista) {

            try {

                const retorno =
                    await enviarServidor(item.dados);

                if (retorno.status === "ok") {

                    removerOffline(item.id);

                }

            } catch (erro) {

                console.error(erro);

            }

        }

    };

}

// --------------------------------------
// Remover Cadastro Offline
// --------------------------------------

function removerOffline(id) {

    const tabela = obterTabela(
        DATABASE.tabelas.pendentes,
        "readwrite"
    );

    tabela.delete(id);

    log(`Cadastro ${id} sincronizado.`);

}

// --------------------------------------
// Verificar Conexão
// --------------------------------------

function estaOnline() {

    return navigator.onLine;

}

// --------------------------------------
// Eventos de Internet
// --------------------------------------

window.addEventListener("online", () => {

    mostrar(
        "Internet restaurada. Sincronizando...",
        "ok"
    );

    sincronizarPendentes();

});

window.addEventListener("offline", () => {

    mostrar(
        "Modo Offline",
        "ok"
    );

    log("Aplicação Offline.");

});