
document
  .getElementById("agendamentoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
 
    const tutor = document.getElementById("tutor").value;
    const pet = document.getElementById("pet").value;
    const porte = document.getElementById("porte").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const obs = document.getElementById("obs").value;
 
    const mensagem = `🐾 Novo Agendamento de Banho 🐾
 
Tutor: ${tutor}
Pet: ${pet}
Porte: ${porte}
Data: ${data}
Horário: ${hora}
 
Observações:
${obs}`;
 
    const numeroWhatsApp = "5511981218659";
 
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
 
    window.open(url, "_blank");
  });