// ======================================
// NEXO RELACIONAMENTO
// Comunicação com Google Apps Script
// ======================================

// --------------------------------------
// Enviar Cadastro
// --------------------------------------

async function enviarServidor(dados) {

    try {

        const response = await fetch(API.url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });

        const resultado = await response.json();

        log("Resposta da API:", resultado);

        return resultado;

    } catch (erro) {

        console.error("Erro ao enviar cadastro:", erro);

        throw erro;

    }

}

// --------------------------------------
// Buscar Serviços
// --------------------------------------

async function buscarServicos() {

    try {

        const response = await fetch(API.url + "?acao=servicos");

        const lista = await response.json();

        log("Serviços recebidos:", lista);

        return lista;

    } catch (erro) {

        console.error("Erro ao buscar serviços:", erro);

        throw erro;

    }

}

// --------------------------------------
// Testar Conexão
// --------------------------------------

async function testarConexao() {

    try {

        const response = await fetch(API.url + "?acao=ping");

        return response.ok;

    } catch (erro) {

        return false;

    }

}