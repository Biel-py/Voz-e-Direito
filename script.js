const btnVoltarTopo = document.getElementById("btnVoltarTopo");
const modalChat = document.getElementById("modalChat");
const btnAbrirChat = document.getElementById("btnAbrirChat");
const btnFecharChat = document.getElementById("btnFecharChat");

// Voltar ao Topo
if (btnVoltarTopo) {
  btnVoltarTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Abrir Pop-up do Chat
if (btnAbrirChat && modalChat) {
  btnAbrirChat.addEventListener("click", () => {
    modalChat.style.display = "block";
  });
}

// Fechar Pop-up no X estilizado
if (btnFecharChat && modalChat) {
  btnFecharChat.addEventListener("click", () => {
    modalChat.style.display = "none";
  });
}

// Fechar Pop-up ao clicar fora da caixa do modal
window.addEventListener("click", (e) => {
  if (e.target === modalChat) {
    modalChat.style.display = "none";
  }
});

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Função para renderizar as mensagens na tela
function adicionarMensagem(texto, remetente) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  if (remetente === 'user') {
    messageDiv.classList.add('user-message');
    messageDiv.textContent = `Você: ${texto}`;
  } else {
    messageDiv.classList.add('bot-message');
    messageDiv.textContent = `Bot: ${texto}`;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escutador do Envio do Formulário
if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const textoOriginal = userInput.value;
    const texto = textoOriginal.trim().toLowerCase();

    if (!texto) return;

    // Adiciona a mensagem enviada pelo usuário
    adicionarMensagem(textoOriginal, 'user');
    userInput.value = '';

    //Palavras de encerramento
    if (texto === 'sair' || texto === 'fim' || texto === 'encerrar') {
      setTimeout(() => {
        adicionarMensagem("Até logo! Continue exercendo sua cidadania.", 'bot');
        userInput.disabled = true;
      }, 500);
      return;
    }

    // Validação de tamanho
    const totalPalavras = texto.split(/\s+/).length;
    if (totalPalavras === 1) {
      setTimeout(() => {
        adicionarMensagem("Por favor, digite uma frase completa ou descreva melhor sua dúvida para que eu possa ajudar.", 'bot');
      }, 400);
      return;
    }

    // Respostas predefinidas de Letramento Jurídico
    let resposta = "Não reconheço essa pergunta exata. Tente perguntar sobre direitos do consumidor, demissão sem justa causa ou o que é jurisdição.";

    if (texto === 'o que é letramento jurídico' || texto === 'o que significa letramento jurídico') {
      resposta = "Letramento jurídico é o processo de tornar a linguagem e as leis acessíveis a todos, permitindo que o cidadão compreenda seus direitos e deveres na prática.";
    } else if (texto === 'quais os meus direitos em caso de produto com defeito' || texto === 'produto com defeito o que fazer') {
      resposta = "Segundo o Código de Defesa do Consumidor, o fornecedor tem até 30 dias para sanar o vício. Se não for resolvido, você pode exigir a troca, a restituição do dinheiro ou abatimento proporcional.";
    } else if (texto === 'como funciona a demissão sem justa causa' || texto === 'quais os direitos na demissão sem justa causa') {
      resposta = "Na demissão sem justa causa, você tem direito ao saldo de salário, aviso prévio indenizado ou trabalhado, 13º proporcional, férias vencidas e proporcionais com acréscimo de um terço, além de sacar o FGTS com multa de 40%.";
    } else if (texto === 'o que significa trânsito em julgado' || texto === 'o que é trânsito em julgado') {
      resposta = "Trânsito em julgado é o momento processual em que não cabem mais recursos contra uma decisão judicial, tornando-a definitiva.";
    }

    setTimeout(() => {
      adicionarMensagem(resposta, 'bot');
    }, 400);
  });
