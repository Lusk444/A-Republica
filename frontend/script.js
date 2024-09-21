// Conectar ao servidor WebSocket
let socket = new WebSocket('ws://localhost:3000');

// Salvar saldos de usuários localmente
let userBalances = {
    user1: 0,
    user2: 0
};

// Receber atualizações de saldo do servidor
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Saldo atualizado:', data);

    // Atualizar os saldos exibidos no frontend
    document.getElementById('balanceUser1').innerText = data.user1.toFixed(2);
    document.getElementById('balanceUser2').innerText = data.user2.toFixed(2);
};

// Função para enviar uma transferência do Usuário 1 para o Usuário 2
function transfer() {
    const amount = parseFloat(document.getElementById('transferAmount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    // Enviar a solicitação de transferência para o servidor
    socket.send(JSON.stringify({
        fromUser: 'user1',
        toUser: 'user2',
        amount: amount
    }));
}
