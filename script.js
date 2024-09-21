// Definindo os usuários com saldo inicial
let users = [
    { id: 1, name: 'User 1', balance: 0 },
    { id: 2, name: 'User 2', balance: 0 }
  ];
  
  // Função para atualizar saldo
  function updateBalances() {
    // Atualiza o saldo de ambos os usuários para 500 reais
    users.forEach(user => {
      user.balance = 500;
    });
  
    // Atualiza o HTML para exibir os novos saldos
    document.getElementById('balance1').innerText = users[0].balance;
    document.getElementById('balance2').innerText = users[1].balance;
  }
  
  // Chama a função para atualizar os saldos assim que a página carrega
  window.onload = updateBalances;
  