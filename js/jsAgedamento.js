
document.getElementById("agendamentoForm").addEventListener("submit", function (e) {
    e.preventDefault();
 
    // Captura os dados atualizados do HTML
    const tutor = document.getElementById("tutor").value;
    const especie = document.getElementById("especie").value;
    const pet = document.getElementById("pet").value;
    const porte = document.getElementById("porte").value;
    const periodo = document.getElementById("periodo").value;
    const obs = document.getElementById("obs").value || "Nenhuma";
    
    // Captura os serviços selecionados na lista múltipla
    const lista = document.getElementById('dropdown-lista');
    const checkboxes = lista.querySelectorAll('input[type="checkbox"]');
    let servicosSelecionados = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            servicosSelecionados.push(cb.value);
        }
    });
    
    // Validação de segurança: verifica se marcou pelo menos um serviço antes de enviar
    if (servicosSelecionados.length === 0) {
        alert("Por favor, selecione pelo menos um serviço na lista.");
        return;
    }

    // Trata as informações do Táxi Dog
    const querTaxiDog = document.getElementById("toggle-taxi-dog").checked;
    const endereco = document.getElementById("input-endereco").value;
    const infoTaxi = querTaxiDog ? `Sim \n📍 Endereço: ${endereco}` : "Não";
 
    // Montagem da mensagem formatada para o WhatsApp
    const mensagem = `🐾 Novo Agendamento Studio Pet 🐾
 
Tutor: ${tutor}
Pet: ${pet} (${especie})
Porte: ${porte}
Período Desejado: ${periodo}

Serviços Escolhidos: 
${servicosSelecionados.join(', ')}

Contratar Táxi Dog? 
${infoTaxi}
 
Observações:
${obs}`;
 
    const numeroWhatsApp = "5511981218659";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
 
    window.open(url, "_blank");
});

// Abre e fecha a tabela suspensa ao clicar no botão
function alternarDropdownM() {
    const container = document.querySelector('.dropdown-multiplo');
    container.classList.toggle('aberto');
}

// Atualiza o texto do botão com as opções selecionadas (ex: "Banho, Tosa")
function atualizarResumoM() {
    const lista = document.getElementById('dropdown-lista');
    const checkboxes = lista.querySelectorAll('input[type="checkbox"]');
    const textoResumo = document.getElementById('texto-resumo');
    const botao = document.querySelector('.dropdown-botao');
    
    let selecionados = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            selecionados.push(cb.value);
        }
    });
    
    if (selecionados.length > 0) {
        textoResumo.textContent = selecionados.join(', ');
        botao.style.color = 'var(--cor-texto)'; // Texto fica preto quando há seleção
    } else {
        textoResumo.textContent = 'Selecione uma ou mais opções...';
        botao.style.color = 'var(--cor-suave)'; // Volta para a cor cinza padrão
    }
}

// Fecha o dropdown se o usuário clicar fora dele na tela
document.addEventListener('click', function(e) {
    const container = document.querySelector('.dropdown-multiplo');
    if (container && !container.contains(e.target)) {
        container.classList.remove('aberto');
    }
});



  function alternarEndereco() {
    const checkbox = document.getElementById('toggle-taxi-dog');
    const abaEndereco = document.getElementById('aba-endereco');
    const inputEndereco = document.getElementById('input-endereco');

    if (checkbox.checked) {
        // Mostra a aba de endereço e coloca o foco do teclado nela
        abaEndereco.classList.add('ativo');
        inputEndereco.focus();
    } else {
        // Esconde a aba e limpa o campo caso o usuário desmarque
        abaEndereco.classList.remove('ativo');
        inputEndereco.value = '';
    }
}