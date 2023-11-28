//console.log(web3); foi usado para testar se web3 estava definido antes de chamar a função checkNFT
let contract;
async function checkNFT(web3, contractAddress, ownerAddress, tokenId) {
    const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "checkNFT",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Substitua isso pela ABI do seu contrato
    //console.log(web3.eth);
    if (web3 && web3.eth) {
        const contract = new web3.eth.Contract(abi, "0x8024489C6Bd033b213B464865F8b19aa427515e8");
        //console.log(contract);
        //const result = await contract.methods.checkNFT(NFTContractAddress, ownerAddress, tokenId).call();
	const result = await contract.methods.checkNFT(contractAddress, ownerAddress, tokenId).call();
        return result;
    } else {
        console.error('Web3 is not defined. Please check your connection and try again.');
    }
}
