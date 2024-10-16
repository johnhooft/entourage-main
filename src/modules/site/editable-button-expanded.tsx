import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditableScrollButtonExpandedProps {
  initialText: string;
  style: React.CSSProperties;
  onUpdate: (newText: string) => void;
  onExpand: (page: string) => void;
  page: string
}

export const ScrollButtonExpanded: React.FC<EditableScrollButtonExpandedProps> = ({ initialText, style, onUpdate, onExpand, page }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [text, setText] = useState(initialText);

    const onClick = () => {
        onExpand(page)
    }
    
    const buttonStyle = {
        ...style,
        borderColor: style.color || 'inherit'
    };

    return (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
            <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                <button onClick={onClick} className='border p-2 rounded-[15px]' style={buttonStyle}>
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
            </div>
            <div className="flex justify-between">
            <Button onClick={() => {
                onUpdate(text);
                setIsEditing(false);
            }} className='border-[1px] border-black'>
                Save changes
            </Button>
            <Button onClick={() => {
                onClick();
                setIsEditing(false);
            }} className='border-[1px] border-black'>
                View Expanded Page
            </Button>
            </div>
        </DialogContent>
        </Dialog>
    );
};
