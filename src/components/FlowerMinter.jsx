import { useState, useEffect, useCallback } from 'react';
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, JsonRpcProvider, Wallet } from 'ethers';
import { contractAddresses, abi } from '../contracts/contractData';

const FlowerMinter = () => {
  const { walletProvider } = useAppKitProvider('eip155');
  const { address, isConnected } = useAppKitAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [hasReceived, setHasReceived] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Check if user has already received a flower
  const checkFlowerStatus = useCallback(async () => {
    if (!isConnected || !address) return;
    
    setCheckingStatus(true);
    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const contract = new Contract(contractAddresses, abi, ethersProvider);
      const received = await contract.hasReceivedFlower(address);
      setHasReceived(received);
    } catch (error) {
      console.error('Error checking flower status:', error);
    } finally {
      setCheckingStatus(false);
    }
  }, [isConnected, address, walletProvider]);

  // Handle flower minting with owner's wallet
  const handleMintFlower = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }
    console.log(1);
    setIsMinting(true);
    try {
      // Use owner's private key for automatic signing
      const ownerPrivateKey = import.meta.env.VITE_OWNER_PRIVATE_KEY;
      const rpcUrl = import.meta.env.VITE_ALCHEMY_RPC_URL;
      
      if (!ownerPrivateKey || !rpcUrl) {
        throw new Error('Missing owner credentials or RPC URL');
      }

      // Create provider and wallet for owner
      const provider = new JsonRpcProvider(rpcUrl);
      const ownerWallet = new Wallet(ownerPrivateKey, provider);
      
      // Check owner's balance for gas
      const balance = await provider.getBalance(ownerWallet.address);
      const minBalance = BigInt("1000000000000000"); // 0.001 ETH minimum for gas
      
      if (balance < minBalance) {
        alert('Owner wallet does not have enough ETH for gas fees. Please fund the owner wallet.');
        return;
      }

      // Create contract instance with owner's wallet
      const contract = new Contract(contractAddresses, abi, ownerWallet);

      // Generate parameters for minting
      const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      const nonce = Math.floor(Math.random() * 1000000); // Random nonce
      const metadataURI = "ipfs://bafkreigvhomlxwirx5w5rd5gsufsox34fbry6yae6tktrkmmxykxdlrkh4"; // Mock metadata URI

      console.log('Minting flower with params:', {
        recipient: address, // User's address as recipient
        metadataURI,
        nonce,
        timestamp,
        ownerAddress: ownerWallet.address
      });

      // Call the mintFlower function with owner's wallet
      const tx = await contract.mintFlower(address, metadataURI, nonce, timestamp);
      
      console.log('Transaction sent:', tx.hash);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);
      
      alert('🌸 Congratulations! You received your flower! 🌸');
      setHasReceived(true);
      
    } catch (error) {
      console.error('Error minting flower:', error);
      
      if (error.reason) {
        alert(`Failed to mint flower: ${error.reason}`);
      } else if (error.message.includes('insufficient funds')) {
        alert('Owner wallet does not have enough ETH for gas fees');
      } else if (error.message.includes('Missing owner credentials')) {
        alert('Owner credentials not configured properly');
      } else {
        alert('Failed to mint flower. Please try again.');
      }
    } finally {
      setIsMinting(false);
    }
  };

  // Check flower status when component mounts or when connection changes
  useEffect(() => {
    if (isConnected && address) {
      checkFlowerStatus();
    }
  }, [isConnected, address, checkFlowerStatus]);

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 shadow-2xl'>
        <div className='text-center mb-8'>
          <div className='text-6xl mb-4'>🌸</div>
          <h2 className='text-4xl font-bold text-white mb-2'>You Deserve a Flower</h2>
          <p className='text-purple-200 text-lg'>A special NFT flower just for you</p>
        </div>

        {!isConnected ? (
          <div className='text-center py-8'>
            <p className='text-purple-300 mb-4'>Please connect your wallet to receive your flower</p>
            <div className='w-16 h-16 mx-auto border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin'></div>
          </div>
        ) : checkingStatus ? (
          <div className='text-center py-8'>
            <p className='text-purple-300 mb-4'>Checking your flower status...</p>
            <div className='w-16 h-16 mx-auto border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin'></div>
          </div>
        ) : hasReceived ? (
          <div className='text-center py-8'>
            <div className='text-5xl mb-4'>🎉</div>
            <h3 className='text-2xl font-bold text-white mb-4'>You already have your flower!</h3>
            <p className='text-purple-200'>You can only receive one flower per wallet address.</p>
            <p className='text-sm text-purple-300 mt-4'>Check your wallet or OpenSea to view your NFT</p>
          </div>
        ) : (
          <div className='text-center'>
            <div className='mb-6'>
              <p className='text-purple-200 mb-4'>
                Click the button below to receive your unique flower NFT
              </p>
              <p className='text-sm text-purple-300'>
                • Each wallet can only receive one flower<br/>
                • Your flower will be uniquely generated<br/>
                • This is completely free!
              </p>
            </div>
            
            <button
              onClick={handleMintFlower}
              disabled={isMinting}
              className='group relative overflow-hidden font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              style={{ 
                backgroundColor: '#704b91',
                color: '#e6c6d4',
                boxShadow: '0 10px 30px rgba(112, 75, 145, 0.3)'
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
              <span className='relative flex items-center justify-center space-x-2'>
                {isMinting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Minting Your Flower...</span>
                  </>
                ) : (
                  <>
                    <span>🌸</span>
                    <span>Receive Your Flower</span>
                    <span>🌸</span>
                  </>
                )}
              </span>
            </button>
            
            {isMinting && (
              <p className='text-sm text-purple-300 mt-4'>
                Please confirm the transaction in your wallet and wait for confirmation...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowerMinter;