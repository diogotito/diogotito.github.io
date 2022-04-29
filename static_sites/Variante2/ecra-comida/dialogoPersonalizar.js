const MSG_CONFIRMACAO = `Ao carregar em "Ok", vão lhe ser retirados 12345€ da sua conta bancária.
Tem a certeza que deseja prosseguir?`;
const MSG_NO_REFUNDS = `Tem a certeza que deseja cancelar o seu pedido?
Não efetuamos reembolsos!`;

// vou fazer o minimo dos minimos

var hash = location.hash.substr(1),
    dadosComida = DADOS_COMIDA.menus[hash]   ||  // Procura nos menus
                  DADOS_COMIDA.comidas[hash] ||  // Procura nas comidas
                  DADOS_COMIDA.bebidas[hash];    // Procura nas bebidas


document.addEventListener("DOMContentLoaded", onDocumentReady)

function onDocumentReady (event) {
    var cabecalho = document.getElementById("nome-produto"),
        ilustracao = document.getElementById("ilustracao"),
        fieldsetMenu = document.getElementById("menu"),
        fieldsetOpcionais = document.getElementById("opcionais"),
        fieldsetVariantes = document.getElementById("variante"),
        finalizarBtn = document.getElementById("finalizar-btn");

    // Preenche o nome e a imagem
    ilustracao.src = dadosComida.imagem;
    cabecalho.textContent = dadosComida.nome;

    // Escollhe o <fieldset> mais adequado e popula com as entradas necessarias
    if (hash in DADOS_COMIDA.menus) {
        fieldsetMenu.style.display = "block";
    } else {
        if (dadosComida.variantes.length > 0) {
            fieldsetVariantes.style.display = "block";
            popularFieldset(fieldsetVariantes, dadosComida.variantes);
        }
        if (dadosComida.opcoes.length > 0) {
            fieldsetOpcionais.style.display = "block";
            popularFieldset(fieldsetOpcionais, dadosComida.opcoes);
        }
    }
    
    // Exibe um dialogo de confimacao ao clickar em "Finalizar Pedido"
    finalizarBtn.addEventListener("click", function (e) {
        if (confirm(MSG_CONFIRMACAO)) {
            // Se a janela nao estiver maximizada
            if (typeof parent.addNotification === "function") {
                var imgSrc = "ecra-comida/" + dadosComida.imagem;
                parent.addNotification(imgSrc, function (e) {
                    if (confirm(MSG_NO_REFUNDS)) {
                        this.remove();
                    }
                });
                parent.zacariasVaiAhFalencia(); // fica com saldo BUE negativo
            }
        } else {
            e.preventDefault();
        }
    });
};

/**
 * Cria dinamicamente um radio buttons para cada variante da bebida selecionada
 */
function popularFieldset(fieldset, dados) {
    // <div> a ser clonado ou usado
    var div = fieldset.querySelector("div");

    for (var i = 0; i < dados.length; i++) {
        var entrada = (i == dados.length - 1) ? div : div.cloneNode(true),
            input = entrada.querySelector("input"),
            label = entrada.querySelector("label");

        input.value = input.id = label.textContent = label.htmlFor = dados[i];
        
        // Se este for o 1o radio button do fieldset, seleciona-o
        if (i === 0 && input.type === "radio") {
            input.checked = true;
        }
        
        fieldset.appendChild(entrada);
    }
}