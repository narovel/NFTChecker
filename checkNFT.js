async function checkNFT(web3, contractAddress, ownerAddress, tokenId) {
    const abi = []; // Substitua isso pela ABI do seu contrato
    const contract = new web3.eth.Contract(abi, contractAddress);
    const result = await contract.methods.checkNFT(contractAddress, ownerAddress, tokenId).call();
    return result;
}
