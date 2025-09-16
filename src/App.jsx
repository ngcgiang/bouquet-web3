import { createAppKit} from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import './App.css'
import Header from './components/Header'
import FlowerMinter from './components/FlowerMinter'
import OwnerPanel from './components/OwnerPanel';


// 1. Get projectId
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Set the networks with your Alchemy RPC URL
const networks = [
  {
    id: 11155111, // Example: Sepolia testnet
    name: "Sepolia",
    explorer: "https://sepolia.etherscan.io",
    rpcUrls: [import.meta.env.VITE_ALCHEMY_RPC_URL], // Use your Alchemy RPC URL from .env
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
];

// 3. Create a metadata object - optional
const metadata = {
  name: "You Deserve",
  description: "A present for you",
  url: "https://you-deserve.com", // origin must match your domain & subdomain
  icons: ["https://avatars.you-deserve.com/"],
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});



function App() {
  return (
    <div style={{ backgroundColor: '#1f1b3b', minHeight: '100vh' }}>
      <Header />
      
      <main className='px-6 py-8'>
        <FlowerMinter />
        <div className='my-8'></div>
        <OwnerPanel />
      </main>

      <footer className='mt-auto px-6 py-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-sm' style={{ color: '#e6c6d4' }}>&copy; 2024 Your Company</p>
        </div>
      </footer>
    </div>
  )
}

export default App
