import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditableScrollButtonLinkProps {
  initialText: string;
  initialUrl: string;
  style?: React.CSSProperties;
  onUpdate: (newText: string, newUrl: string) => void;
}

export const ScrollButtonLink: React.FC<EditableScrollButtonLinkProps> = ({ initialText, initialUrl, style, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [text, setText] = useState(initialText);
    const [url, setUrl] = useState(initialUrl);

    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
            <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                <button onClick={handleClick} className='border-[1px] p-2 rounded-[15px]' style={style}>
                    {text}
                </button>
            {isHovered && (
                <div className='text-gray-500 bg-white rounded-full absolute -top-3 -right-3 '>
                    <Pencil className="w-6 h-6 p-1 hover:cursor-crosshair" />
                </div>
            )}
            </div>
        </DialogTrigger>
        <DialogContent className="bg-white text-black">
            <DialogHeader>
            <DialogTitle>Edit Button</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="buttonText" className="text-right">
                Button Text
                </Label>
                <Input
                id="buttonText"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-span-3 bg-white"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="buttonUrl" className="text-right">
                Button URL
                </Label>
                <Input
                id="buttonUrl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3 bg-white"
                />
            </div>
            </div>
            <div className="flex justify-center">
            <Button onClick={() => {
                onUpdate(text, url);
                setIsEditing(false);
            }} className='border-[1px] border-black'>
                Save changes
            </Button>
            </div>
        </DialogContent>
        </Dialog>
    );
};