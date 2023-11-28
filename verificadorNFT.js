// Defina o endereço do contrato e o ID do Token
const contratoNFTAddress = "0x84B132701C61AB69aB907a6A204d55afb0fD18f5";
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
        // Conectar a Metamask
        const contas = await ethereum.request({ method: 'eth_requestAccounts' });
        const conta = contas[0];

        // Criar uma instância do contrato ERC-721
        const contratoNFT = new web3.eth.Contract([
            // ABI do ERC-721
            // ...
        ], contratoNFTAddress);

        // Verificar se a conta possui o NFT
        const possuiNFT = await contratoNFT.methods.ownerOf(tokenId).call({ from: conta });

        if (possuiNFT === conta) {
            // Se a conta possuir o NFT, obter informações adicionais (imagem, nome, descrição)
            const imagem = await contratoNFT.methods.getImagem(tokenId).call({ from: conta });
            const nome = await contratoNFT.methods.getNome(tokenId).call({ from: conta });
            const descricao = await contratoNFT.methods.getDescricao(tokenId).call({ from: conta });

            // Atualizar a página com as informações do NFT
            atualizarPagina(imagem, nome, descricao);
        } else {
            console.log("Esta conta não possui o NFT com o ID:", tokenId);
        }
    } catch (error) {
        console.error("Erro ao verificar NFT:", error);
    }
};

// Adicionar um ouvinte de evento ao botão para chamar a função de verificação
document.getElementById('connectWalletButton').addEventListener('click', verificarNFT);
