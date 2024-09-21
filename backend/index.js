const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Configuração do servidor Express
const app = express();
const server = http.createServer(app);

// Configuração do servidor WebSocket
const wss = new WebSocket.Server({ server });

// Objeto para armazenar o saldo dos usuários (simulação)
let userBalances = {
    user1: 1000.00,
    user2: 500.00
};

// Função para transmitir os saldos atualizados para todos os clientes conectados
function broadcastBalanceUpdate() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(userBalances));
        }
    });
}

// Configuração da comunicação via WebSocket
wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');

    // Enviar saldo inicial quando um cliente se conecta
    ws.send(JSON.stringify(userBalances));

    // Receber e processar mensagens enviadas pelo frontend
    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);
        const data = JSON.parse(message);

        const { fromUser, toUser, amount } = data;

        // Simular transferência de saldo
        if (userBalances[fromUser] >= amount) {
            userBalances[fromUser] -= amount;
            userBalances[toUser] += amount;
            console.log(`Transferência de R$${amount} de ${fromUser} para ${toUser}`);

            // Atualizar saldo para todos os clientes conectados
            broadcastBalanceUpdate();
        }
    });

    // Quando o cliente desconecta
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
