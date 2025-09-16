/**
 * Shortens an Ethereum address for display purposes
 * @param {string} address - The full Ethereum address
 * @param {number} startLength - Number of characters to show at the start (default: 6)
 * @param {number} endLength - Number of characters to show at the end (default: 4)
 * @returns {string} - Shortened address in format "0x1234...abcd"
 */
export const shortenAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};