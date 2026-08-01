// ======================================
// NEXO RELACIONAMENTO
// Interface do Usuário (UI)
// ======================================

// --------------------------------------
// Elementos da Tela
// --------------------------------------

const form = document.getElementById("formCadastro");

const select = document.getElementById("servico");

const btn = document.getElementById("btnSalvar");

const msg = document.getElementById("mensagem");

// --------------------------------------
// Mostrar Mensagem
// --------------------------------------

function mostrar(texto, tipo = "ok") {

    msg.innerHTML = texto;

    msg.className = "msg " + tipo;

    setTimeout(() => {

        msg.innerHTML = "";

        msg.className = "msg";

    }, UI.tempoMensagem);

}

// --------------------------------------
// Limpar Formulário
// --------------------------------------

function limparFormulario() {

    form.reset();

    select.selectedIndex = 0;

    document
        .getElementById(UI.focoInicial)
        .focus();

}

// --------------------------------------
// Bloquear Botão
// --------------------------------------

function bloquearBotao() {

    btn.disabled = true;

    btn.innerHTML = "Salvando...";

}

// --------------------------------------
// Liberar Botão
// --------------------------------------

function liberarBotao() {

    btn.disabled = false;

    btn.innerHTML = "Salvar Cadastro";

}

// --------------------------------------
// Ativar Select
// --------------------------------------

function habilitarServicos() {

    select.disabled = false;

}

// --------------------------------------
// Desativar Select
// --------------------------------------

function desabilitarServicos() {

    select.disabled = true;

}

// --------------------------------------
// Atualizar Status da Conexão
// --------------------------------------

function atualizarStatusConexao() {

    if (navigator.onLine) {

        mostrar(
            "Online",
            "ok"
        );

    } else {

        mostrar(
            "Modo Offline",
            "ok"
        );

    }

}

// --------------------------------------
// Mostrar Loading
// --------------------------------------

function iniciarLoading() {

    bloquearBotao();

}

// --------------------------------------
// Finalizar Loading
// --------------------------------------

function finalizarLoading() {

    liberarBotao();

}

// --------------------------------------
// Exibir Erro
// --------------------------------------

function mostrarErro(texto) {

    mostrar(texto, "err");

}

// --------------------------------------
// Exibir Sucesso
// --------------------------------------

function mostrarSucesso(texto) {

    mostrar(texto, "ok");

}