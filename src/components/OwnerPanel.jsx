import { useState } from 'react';
import { useAppKitAccount } from "@reown/appkit/react";

const OwnerPanel = () => {
  const { address, isConnected } = useAppKitAccount();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  // Owner address from environment
  const ownerAddress = import.meta.env.VITE_OWNER_ADDRESS;

  // Check if current user is the owner
  const isOwner = isConnected && address && address.toLowerCase() === ownerAddress?.toLowerCase();

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (images only)
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:3001/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      setUploadResult(result);
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // If not connected or not owner, show access denied
  if (isOwner) {
    return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 shadow-2xl'>
        <div className='text-center mb-8'>
          <div className='text-4xl mb-4'>👑</div>
          <h2 className='text-3xl font-bold text-white mb-2'>Owner Panel</h2>
          <p className='text-purple-200'>Upload flower images and create NFT metadata</p>
          <p className='text-sm text-purple-300 mt-2'>Connected as: {address}</p>
        </div>

        {/* File Upload Section */}
        <div className='mb-8'>
          <label className='block text-white font-semibold mb-4'>
            Select Flower Image
          </label>
          
          <div className='border-2 border-dashed border-purple-400/50 rounded-lg p-6 text-center mb-4'>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className='hidden'
            />
            
            <label
              htmlFor="fileInput"
              className='cursor-pointer block'
            >
              <div className='text-4xl mb-2'>🖼️</div>
              <p className='text-purple-200 mb-2'>Click to select an image</p>
              <p className='text-sm text-purple-300'>Supports: JPG, PNG, GIF (Max: 10MB)</p>
            </label>
          </div>

          {selectedFile && (
            <div className='bg-white/10 rounded-lg p-4 mb-4'>
              <h4 className='text-white font-semibold mb-2'>Selected File:</h4>
              <p className='text-purple-200 text-sm'>Name: {selectedFile.name}</p>
              <p className='text-purple-200 text-sm'>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <p className='text-purple-200 text-sm'>Type: {selectedFile.type}</p>
            </div>
          )}

          {error && (
            <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4'>
              <p className='text-red-200'>{error}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className='w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            style={{ 
              backgroundColor: selectedFile && !uploading ? '#704b91' : '#4a5568',
              color: '#e6c6d4'
            }}
          >
            {uploading ? (
              <span className='flex items-center justify-center space-x-2'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                <span>Uploading to Pinata...</span>
              </span>
            ) : (
              'Upload Image & Create NFT'
            )}
          </button>
        </div>

        {/* Upload Result */}
        {uploadResult && (
          <div className='bg-green-500/20 border border-green-500/50 rounded-lg p-6'>
            <h4 className='text-green-200 font-semibold mb-4 flex items-center'>
              <span className='mr-2'>✅</span>
              Upload Successful!
            </h4>
            
            <div className='space-y-3'>
              <div>
                <p className='text-green-200 font-medium'>Image CID:</p>
                <p className='text-green-100 text-sm font-mono bg-black/20 p-2 rounded break-all'>
                  {uploadResult.imageCID}
                </p>
              </div>
              
              <div>
                <p className='text-green-200 font-medium'>Metadata CID:</p>
                <p className='text-green-100 text-sm font-mono bg-black/20 p-2 rounded break-all'>
                  {uploadResult.metadataCID}
                </p>
              </div>
              
              <div>
                <p className='text-green-200 font-medium'>Database Updated:</p>
                <p className='text-green-100 text-sm'>
                  Total flower CIDs in database: {uploadResult.totalCIDs}
                </p>
              </div>

              <div className='pt-4 border-t border-green-500/30'>
                <p className='text-green-200 text-sm'>
                  📋 You can now use this metadata CID: <br/>
                  <code className='text-green-100 font-mono text-xs'>ipfs://{uploadResult.metadataCID}</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className='mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-6'>
          <h4 className='text-blue-200 font-semibold mb-3'>Instructions:</h4>
          <ol className='text-blue-100 text-sm space-y-2 list-decimal list-inside'>
            <li>Select a flower image from your computer</li>
            <li>Click "Upload Image & Create NFT" to process</li>
            <li>The system will automatically upload to Pinata and create metadata</li>
            <li>Copy the metadata CID to update your smart contract</li>
            <li>The CID will be saved to the local database for tracking</li>
          </ol>
        </div>
      </div>
    </div>
    );
}
};

export default OwnerPanel;