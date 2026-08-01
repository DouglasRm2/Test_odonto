// ======================================
// NEXO RELACIONAMENTO
// Configurações Globais
// ======================================

// --------------------------------------
// Informações da Aplicação
// --------------------------------------

const APP = {

    nome: "NEXO Relacionamento",

    versao: "1.0.0",

    empresa: "NEXO Relacionamento",

    modoDebug: true

};

// --------------------------------------
// Google Apps Script
// --------------------------------------

const API = {

    url: "https://script.google.com/macros/s/AKfycbxL_ourMI3pd7A7I1HBXridnI4crWV20zPmQ38PoJSkQps7xA8sPNW-leepLUCdo1npBw/exec"

};

// --------------------------------------
// IndexedDB
// --------------------------------------

const DATABASE = {

    nome: "Odonto_Local",

    versao: 1,

    tabelas: {

        pendentes: "pendentes",

        servicos: "servicos"

    }

};

// --------------------------------------
// Configurações da Interface
// --------------------------------------

const UI = {

    tempoMensagem: 3000,

    focoInicial: "nome"

};

// --------------------------------------
// Status da Aplicação
// --------------------------------------

const STATUS = {

    ONLINE: "online",

    OFFLINE: "offline"

};

// --------------------------------------
// Logs (Apenas em Debug)
// --------------------------------------

function log(...mensagem) {

    if (APP.modoDebug) {

        console.log("[NEXO]", ...mensagem);

    }

}