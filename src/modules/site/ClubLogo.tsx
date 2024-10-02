import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from "uuid";
import { LoadingSpinner } from '../LoadingSpinner';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface EditableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  id: string;
  onImageUpdate: (newImageUrl: string) => void;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  id,
  onImageUpdate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteOldImage = useCallback(async (oldImageUrl: string) => {
    if (oldImageUrl.includes('supabase.co')) {
      // Extract the file path from the Supabase URL
      const urlParts = oldImageUrl.split('/');
      const bucketName = urlParts[urlParts.indexOf('public') + 1];
      const filePath = urlParts.slice(urlParts.indexOf(bucketName) + 1).join('/');
      
      if (filePath) {
        const { error } = await supabase.storage
          .from('images')
          .remove([filePath]);
        
        if (error) {
          console.error('Error deleting old image:', error);
        } else {
          console.log('Successfully deleted old image:', filePath);
        }
      }
    }
  }, []);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (publicUrlData) {
        // Delete old image before updating to the new one
        await deleteOldImage(src);
        onImageUpdate(publicUrlData.publicUrl);
      } else {
        throw new Error('Failed to get public URL');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  }, [src, onImageUpdate, deleteOldImage]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        priority
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-100'}`}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <LoadingSpinner className="h-12 w-12 text-blue-500" />
        </div>
      )}

      <input
        id={id}
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageUpload}
        disabled={isLoading}
      />

      {isHovered && !isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <label htmlFor={id} className="flex cursor-pointer bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300">
            Edit
          </label>
        </div>
      )}
    </div>
  );
};

export default EditableImage;