// Aguarde o carregamento da página antes de iniciar
window.addEventListener('load', async () => {
    try {
        // Verifique se o navegador suporta Ethereum (MetaMask)
        if (window.ethereum && window.ethereum.isMetaMask) {
            // Inicialize o Web3 com a instância do MetaMask
            window.web3 = new Web3(ethereum);

            // Exiba ou oculte botões e informações com base na conexão da carteira
            atualizarInterface();

            // Adicione ouvintes de eventos aos botões
            document.getElementById('connectWalletButton').addEventListener('click', conectarCarteira);
            document.getElementById('disconnectWalletButton').addEventListener('click', desconectarCarteira);
            document.getElementById('checkNFTButton').addEventListener('click', verificarNFT);

            // Recupere a lista de contas conectadas
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            // Exiba informações no console
            console.log('MetaMask conectado:', ethereum.isConnected());
            console.log('Contas conectadas:', accounts);

            // Atualize a interface com base na conexão da carteira
            atualizarInterface();

        } else {
            console.log('MetaMask não detectado. Considere usar o MetaMask!');
        }
    } catch (error) {
        console.error('Erro durante a inicialização do Web3:', error);
    }
});

// Função para conectar a carteira
const conectarCarteira = async () => {
    try {
        // Solicitar acesso à conta MetaMask
        const contas = await ethereum.request({ method: 'eth_requestAccounts' });
        const conta = contas[0];

        console.log("Conta conectada:", conta);

        // Atualize a interface com base na conexão da carteira
        atualizarInterface();

    } catch (error) {
        console.error("Erro ao conectar carteira:", error);
    }
};

// Função para desconectar a carteira
const desconectarCarteira = async () => {
    try {
        // Solicitar desconexão da conta MetaMask
        await ethereum.request({ method: 'eth_logout' });

        // Atualize a interface com base na desconexão da carteira
        atualizarInterface();

    } catch (error) {
        console.error("Erro ao desconectar carteira:", error);
    }
};

// Função para verificar a posse do NFT
const verificarNFT = async () => {
    try {
        // Verifique se há uma conta conectada
        const contas = await ethereum.request({ method: 'eth_accounts' });

        if (contas.length === 0) {
            console.log("Nenhuma conta conectada.");
            return;
        }

        const conta = contas[0];

        console.log("Conta conectada:", conta);

        // Defina o endereço do contrato e o ID do Token
        const contratoNFTAddress = "0x1d96efE72555BD01bCA5621493d9f6b6ef8A1D89";
        const tokenId = 1; // Substitua pelo ID do Token que você está verificando

        // Defina a ABI do seu contrato ERC-721
        const abiContratoNFT = [
		
	[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
	
	];

        // Crie a instância do contrato ERC-721
        const contratoNFT = new web3.eth.Contract(abiContratoNFT, contratoNFTAddress);

        // Chame a função ownerOf para verificar a posse do NFT
        const possuiNFT = await contratoNFT.methods.ownerOf(tokenId).call({ from: conta });

        console.log("Possui NFT:", possuiNFT);

        // Verificar se a conta possui o NFT com o ID especificado
        if (possuiNFT === conta) {
            console.log("Esta conta possui o NFT com o ID:", tokenId);
            // Aqui você pode chamar a função para atualizar a página com informações do NFT
        } else {
            console.log("Esta conta NÃO possui o NFT com o ID:", tokenId);
        }
    } catch (error) {
        console.error("Erro ao verificar NFT:", error);
    }
};

// Função para atualizar a interface com base na conexão da carteira
const atualizarInterface = async () => {
    try {
        // Verifique se o navegador suporta Ethereum (MetaMask)
        if (window.ethereum && window.ethereum.isMetaMask) {
            // Recupere a lista de contas conectadas
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            // Exiba ou oculte botões com base na conexão da carteira
            if (accounts.length > 0) {
                document.getElementById('connectWalletButton').style.display = 'none';
                document.getElementById('disconnectWalletButton').style.display = 'block';
                document.getElementById('walletAddress').textContent = `Endereço da Carteira: ${accounts[0]}`;
            } else {
                document.getElementById('connectWalletButton').style.display = 'block';
                document.getElementById('disconnectWalletButton').style.display = 'none';
                document.getElementById('walletAddress').textContent = '';
            }
        }
    } catch (error) {
        console.error("Erro ao verificar NFT:", error);
    }
};
