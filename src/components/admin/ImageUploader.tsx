import { useState, useRef } from 'react';
import { storage, IMAGES_BUCKET_ID } from '../../lib/appwrite';
import { ID } from 'appwrite';
import { FiUploadCloud, FiTrash2, FiLoader } from 'react-icons/fi';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export const ImageUploader = ({ value, onChange, label = 'Image', className = '' }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      // Create file in Appwrite Storage bucket
      const uploadedFile = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        file
      );

      // Construct public URL
      const fileUrl = storage.getFileView(IMAGES_BUCKET_ID, uploadedFile.$id).toString();
      
      // Update parent component state
      onChange(fileUrl);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset input value to allow selecting the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="block text-xs md:text-sm font-semibold text-charcoal">{label}</label>
      
      <div className="flex gap-4 items-start">
        {value ? (
          <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-lg border border-sage-200 overflow-hidden bg-sage-50 flex-shrink-0">
            <img 
              referrerPolicy="no-referrer"
              src={value} 
              alt="Uploaded file" 
              className="w-full h-full object-cover" 
            />
            <button 
              type="button"
              title="Remove image"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-charcoal/70 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-sage-300 bg-sage-50/50 flex flex-col items-center justify-center text-sage-400 flex-shrink-0">
            <FiUploadCloud size={24} className="mb-2" />
            <span className="text-[10px] sm:text-xs text-center px-2">No Image</span>
          </div>
        )}

        <div className="flex flex-col flex-1 gap-2 pt-1">
          <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste an image URL here..."
            className="w-full px-3 py-2 rounded-lg border border-sage-300 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400 bg-white text-sm"
          />
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button 
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="self-start flex items-center justify-center gap-2 px-4 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 font-medium rounded-lg text-sm border border-sage-200 transition-colors disabled:opacity-50"
          >
            {isUploading ? <FiLoader className="animate-spin" size={16} /> : <FiUploadCloud size={16} />}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
          
          {error && <span className="text-xs text-red-500 font-medium mt-1">{error}</span>}
        </div>
      </div>
    </div>
  );
};
