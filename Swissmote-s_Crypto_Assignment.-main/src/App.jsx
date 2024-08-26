import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  async function getEthereumBalance(address) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceBigNumber = await provider.getBalance(address);
      return ethers.formatEther(balanceBigNumber);
    } catch (error) {
      console.error("Error fetching Ethereum balance:", error);
      return null;
    }
  }

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);
        const ethBalance = await getEthereumBalance(address);
        setBalance(ethBalance);
      } else {
        alert("Dont have MetaMask in browser!");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-900 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl px-8 py-16 shadow-lg text-center w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-white mb-8">
          Connect to MetaMask
        </h1>
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-lg"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
        {walletAddress && (
          <>
            {balance !== null && (
              <p className=" font-bold text-white mt-4">
                Ethereum Balance: {balance} ETH
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectWalletButton;
