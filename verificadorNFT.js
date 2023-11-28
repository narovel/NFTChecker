// Defina o endereço do contrato e o ID do Token
const contratoNFTAddress = "0xCODIGOVAIAQUI";
const tokenId = 0; // Substitua pelo ID do Token que você está verificando

// Evento para atualizar a página com informações do NFT
const atualizarPagina = (imagem, nome, descricao) => {
    // Exibir a imagem, nome e descrição na página
    console.log("Imagem:", imagem);
    console.log("Nome:", nome);
    console.log("Descrição:", descricao);
};

// Função para verificar se a conta possui o NFT
const verificarNFT = async () => {
    try {
        // Solicitar acesso à conta MetaMask
        const contas = await ethereum.request({ method: 'eth_requestAccounts' });
        const conta = contas[0];

        console.log("Conta conectada:", conta);

        // Defina a ABI do seu contrato ERC-721
        const abiContratoNFT = "ABI";

        // Crie a instância do contrato ERC-721
        const contratoNFT = new web3.eth.Contract(abiContratoNFT, contratoNFTAddress);

        // Chamar a função ownerOf para verificar a posse do NFT
        const possuiNFT = await contratoNFT.methods.ownerOf(tokenId).call({ from: conta });

        console.log("Possui NFT:", possuiNFT);

        // Verificar se a conta possui o NFT com o ID especificado
        if (possuiNFT === conta) {
            console.log("Esta conta possui o NFT com o ID:", tokenId);
        } else {
            console.log("Esta conta NÃO possui o NFT com o ID:", tokenId);
        }
    } catch (error) {
        console.error("Erro ao verificar NFT:", error);
    }
};

// Adicionar um ouvinte de evento ao botão de verificação
document.getElementById('checkNFTButton').addEventListener('click', verificarNFT);
