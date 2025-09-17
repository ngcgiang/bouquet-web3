import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { shortenAddress } from "../lib/utils";
import { contractAddresses } from "../contracts/contractData";

const Header = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const contractAddress = contractAddresses;
  const etherscanUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;

  const handleConnect = () => {
    open();
  };

  const openEtherscan = () => {
    window.open(etherscanUrl, '_blank');
  };

  return (
    <header className="shadow-lg px-6 py-4 mx-7 rounded-bl-2xl rounded-br-2xl" style={{ backgroundColor: '#3e2960' }}>
      <div
        className="
          flex flex-col gap-4
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Left side - Title and Contract Address */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold" style={{ color: '#e6c6d4' }}>You deserve</h1>
          <button
            onClick={openEtherscan}
            className="flex items-center space-x-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: '#a65e9e' }}
            title="View on Etherscan"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Right side - User Account */}
        <div className="flex items-center">
          {isConnected ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:space-x-4">
              <div className="border px-3 py-2 rounded-lg" style={{ backgroundColor: '#704b91', borderColor: '#a65e9e', color: '#e6c6d4' }}>
                <span className="text-sm">Connected: </span>
                <span className="font-mono">{shortenAddress(address)}</span>
              </div>
              <button
                className="font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:opacity-80"
                style={{ backgroundColor: '#a65e9e', color: '#e6c6d4' }}
                onClick={handleConnect}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: '#704b91', color: '#e6c6d4' }}
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;