import Web3 from 'web3';
import CryptoMarketplaceABI from "./CryptoMarketplaceABI.json";

const getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function () {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }

      console.log('Injected web3 detected.');

      resolve(results)
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      //var provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/metamask')
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545/');

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    }
  })
});

const contractABI = CryptoMarketplaceABI;
const contractAddress = "0x81502324aa8e46300fe159263aad7ecca8a06c91";

export { getWeb3, contractABI, contractAddress };