import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { reduceOpacity } from '../../../utils/site/reduceOpacity';

interface EditableScrollButtonLinkProps {
  initialText: string;
  initialUrl: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onUpdate: (newProps: {buttonLinkText: string, buttonLinkURL: string}) => void;
}

export const ScrollButtonLink: React.FC<EditableScrollButtonLinkProps> = ({ initialText, initialUrl, style, textStyle, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [displayText, setDisplayText] = useState(initialText);
    const [displayUrl, setDisplayUrl] = useState(initialUrl);
    const [editingText, setEditingText] = useState(initialText);
    const [editingUrl, setEditingUrl] = useState(initialUrl);

    const handleClick = () => {
        window.open(displayUrl, '_blank', 'noopener,noreferrer');
    }
    
    const buttonStyle = {
        ...style,
        borderColor: displayUrl === "none" ? reduceOpacity(style?.color!, .065) : style?.color || 'inherit',
        color: displayUrl === "none" ? reduceOpacity(style?.color!, .065): style?.color
    };

    const handleDialogOpen = (open: boolean) => {
        if (open) {
            // When opening the dialog, set editing values to current display values
            setEditingText(displayText);
            setEditingUrl(displayUrl);
        }
        setIsEditing(open);
    };

    const handleSave = () => {
        // Update display values and call onUpdate only when save is clicked
        setDisplayText(editingText);
        setDisplayUrl(editingUrl);
        onUpdate({buttonLinkText: editingText, buttonLinkURL: editingUrl});
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
                        <span style={textStyle}>{displayText}</span>
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
                    <div className="flex flex-col">
                        <Label htmlFor="buttonText" className="text-left mb-2">
                        Button Text
                        </Label>
                        <Input
                        id="buttonText"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="col-span-3 bg-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="buttonUrl" className="text-left mb-2">
                        Button URL (enter &quot;none&quot; to disable button)
                        </Label>
                        <Input
                        id="buttonUrl"
                        value={editingUrl}
                        onChange={(e) => setEditingUrl(e.target.value)}
                        className="col-span-3 bg-white"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleSave} className='border-[1px] border-black'>
                        Save changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};