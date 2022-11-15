import Web3 from "web3";

const getWeb3 = () =>{
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccounts(accounts);
                  } catch (error) {
                    if (error.code === 4001) {
                      // User rejected request
                    }
                
                    setError(error);
                  }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                web3.eth.sendTransaction({/* ... */});
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });
    });
};

export default getWeb3;