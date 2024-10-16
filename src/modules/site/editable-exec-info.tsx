import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from 'next/image';
import EditableImage from './editable-image';

interface EditableExecInfoProps {
  name: string;
  role: string;
  image: string;
  titleFont: string;
  bio: string;
  instaURL: string;
  onInfoChange: (updates: { name?: string; role?: string; image?: string; bio?: string; instaURL?: string }) => void;
  setShowExecCard: (showExecCard: boolean) => void;
}

export default function EditableExecInfo({ name, role, image, titleFont, bio, instaURL, onInfoChange, setShowExecCard }: EditableExecInfoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedRole, setEditedRole] = useState(role);
  const [editedImage, setEditedImage] = useState(image);
  const [editedBio, setEditedBio] = useState(bio);
  const [editedInstaURL, setEditedInstaURL] = useState(instaURL);

  useEffect(() => {
    setEditedName(name);
    setEditedRole(role);
    setEditedImage(image);
    setEditedBio(bio);
    setEditedInstaURL(instaURL);
  }, [name, role, image, bio, instaURL]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Add this line to stop event propagation
    setIsHovered(false);
    setIsEditing(true);
    setShowExecCard(false);
  };

  const handleSave = () => {
    onInfoChange({ name: editedName, role: editedRole, image: editedImage, bio: editedBio, instaURL: editedInstaURL });
    setIsEditing(false);
    setShowExecCard(false);
  };

  const handleImageUpdate = (newImageUrl: string) => {
    //console.log(newImageUrl);
    setEditedImage(newImageUrl);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (!isEditing) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-60 h-48 rounded-[15px] overflow-hidden mb-2">
        {editedImage === "none" ? (
          <div className="flex justify-center items-center w-full h-full">
            <Image 
              src="/image-plus.svg"
              alt="Add executive image"
              width={180}
              height={180}
              className="object-cover"
            />
          </div>
        ) : (
          <Image 
            src={editedImage} 
            alt="Executive image"
            width={240} 
            height={192} 
            className="object-cover"
          />
        )}
      </div>
      <div className="text-center">
        <div className={`text-l font-semibold ${titleFont}`}>{name}</div>
        <div className="text-sm">{role}</div>
      </div>
      {isHovered && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black hover:bg-white/80"
          onClick={handleEditClick}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Edit Executive Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="image" className="text-right">
                Image
              </label>
              <div className="col-span-3">
                <div className="relative">
                  <EditableImage 
                    src={editedImage} 
                    alt={"Executive image"}
                    height={180}
                    width={180}
                    className="object-cover rounded-[15px]"
                    id={`exec-image-edit`}
                    onImageUpdate={handleImageUpdate}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Role
              </label>
              <Input
                id="role"
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <textarea
                id="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="col-span-3 bg-white text-black p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="instaURL" className="text-right">
                Instagram URL
              </label>
              <Input
                id="instaURL"
                value={editedInstaURL}
                onChange={(e) => setEditedInstaURL(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
          </div>
          <DialogFooter>
            <div className='flex w-full justify-between'>
              <Button className='bg-white text-black hover:bg-gray-200 hover:text-black border-[1px] rounded-[15px] border-black' variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className='bg-white text-black hover:bg-gray-200 border-[1px] rounded-[15px] border-black' onClick={handleSave}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
