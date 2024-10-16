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
  const [noSrc, setNoSrc] = useState(src === "none");
  const [imageSrc, setImageSrc] = useState(src);

  const deleteOldImage = useCallback(async (oldImageUrl: string) => {
    if (oldImageUrl.includes('supabase.co') && !oldImageUrl.includes('placeholder-logo.png')) {
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
      const filePath = `temp/${fileName}`; // Changed to use 'temp' folder
      const { data, error } = await supabase.storage
        .from('images') // Changed to use 'images' bucket
        .upload(filePath, file, {
          contentType: file.type,
        });

      if (error) {
        console.error('Error uploading image:', error);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images') // Changed to use 'images' bucket
        .getPublicUrl(filePath); // Changed to use the full filePath

      setImageSrc(publicUrl);
      onImageUpdate(publicUrl);
      setNoSrc(false);

      await deleteOldImage(src);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onImageUpdate, deleteOldImage, src]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {!noSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-100'}`}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width: '100%', height: '100%' }}>
          <Image
            src="/image-plus.svg"
            alt="Add image"
            width={width / 2}
            height={height / 2}
            className="opacity-50"
          />
        </div>
      )}

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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <label htmlFor={id} className="cursor-pointer bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300">
            Edit Image
          </label>
          <span className="text-xs mt-1 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            For best results, use {width}x{height} px
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
