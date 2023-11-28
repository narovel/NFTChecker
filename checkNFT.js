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
    const contract = web3.eth.contract(abi, contractAddress);
    const result = await contract.methods.checkNFT(contractAddress, ownerAddress, tokenId).call();
    return result;
}
