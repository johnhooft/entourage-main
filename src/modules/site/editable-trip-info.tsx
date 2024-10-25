import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from 'next/image';
import EditableImage from './editable-image';

interface EditableTripInfoProps {
  tripTitle: string;
  tripDescription: string;
  tripLocation: string;
  tripDates: string;
  tripImage: string;
  tripCost: string;
  titleFont: string;
  onInfoChange: (updates: { tripTitle?: string; tripDescription?: string; tripLocation?: string; tripDates?: string; tripImage?: string; tripCost?: string }) => void;
  onTripClick: () => void;
}

export default function EditableTripInfo({ tripTitle, tripDescription, tripLocation, tripDates, tripImage, tripCost, titleFont, onInfoChange, onTripClick }: EditableTripInfoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(tripTitle);
  const [editedDescription, setEditedDescription] = useState(tripDescription);
  const [editedLocation, setEditedLocation] = useState(tripLocation);
  const [editedDates, setEditedDates] = useState(tripDates);
  const [editedImage, setEditedImage] = useState(tripImage);
  const [editedCost, setEditedCost] = useState(tripCost);

  useEffect(() => {
    setEditedTitle(tripTitle);
    setEditedDescription(tripDescription);
    setEditedLocation(tripLocation);
    setEditedDates(tripDates);
    setEditedImage(tripImage);
    setEditedCost(tripCost);
  }, [tripTitle, tripDescription, tripLocation, tripDates, tripImage, tripCost]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
    setIsEditing(true);
  };

  const handleSave = () => {
    onInfoChange({ 
      tripTitle: editedTitle, 
      tripDescription: editedDescription, 
      tripLocation: editedLocation, 
      tripDates: editedDates, 
      tripImage: editedImage, 
      tripCost: editedCost 
    });
    setIsEditing(false);
  };

  const handleImageUpdate = (newImageUrl: string) => {
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
      <div 
        className="rounded-[15px] overflow-hidden cursor-pointer"
        onClick={onTripClick}
      >
        {editedImage === "none" ? (
          <div className="flex justify-center items-center">
            <Image 
              src="/image-plus.svg"
              alt="Add trip image"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        ) : (
            <div className='w-[300px] h-[300px]'>
                <Image 
                  src={editedImage} 
                  alt="Trip image"
                  fill
                  className="object-cover rounded-[15px]"
                />
            </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black rounded-[15px] bg-opacity-50 text-white p-4">
          <div className={`text-l font-semibold ${titleFont}`}>{tripTitle}</div>
          <div className="text-sm">{tripLocation}</div>
        </div>
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
            <DialogTitle>Edit Trip Info</DialogTitle>
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
                    alt={"Trip image"}
                    height={180}
                    width={180}
                    className="object-cover rounded-[15px]"
                    id={`trip-image-edit`}
                    onImageUpdate={handleImageUpdate}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="col-span-3 bg-white text-black p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input
                id="location"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dates" className="text-right">
                Dates
              </label>
              <Input
                id="dates"
                value={editedDates}
                onChange={(e) => setEditedDates(e.target.value)}
                className="col-span-3 bg-white text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="cost" className="text-right">
                Cost
              </label>
              <Input
                id="cost"
                value={editedCost}
                onChange={(e) => setEditedCost(e.target.value)}
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
