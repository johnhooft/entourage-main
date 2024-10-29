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
    const [displayText, setDisplayText] = useState(initialText);
    const [editingText, setEditingText] = useState(initialText);

    const handleClick = () => {
        onExpand(page);
    }
    
    const buttonStyle = {
        ...style,
        borderColor: style.color || 'inherit'
    };

    const handleDialogOpen = (open: boolean) => {
        if (open) {
            // Reset editing text to current display text when opening dialog
            setEditingText(displayText);
        }
        setIsEditing(open);
    };

    const handleSave = () => {
        // Update display text and call onUpdate only when save is clicked
        setDisplayText(editingText);
        onUpdate(editingText);
        setIsEditing(false);
    };

    return (
        <Dialog open={isEditing} onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
                <div 
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                    <button onClick={handleClick} className='border p-2 rounded-[15px]' style={buttonStyle}>
                        {displayText}
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
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="col-span-3 bg-white"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button onClick={handleSave} className='border-[1px] border-black'>
                        Save changes
                    </Button>
                    <Button onClick={() => {
                        handleClick();
                        setIsEditing(false);
                    }} className='border-[1px] border-black'>
                        View Expanded Page
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};