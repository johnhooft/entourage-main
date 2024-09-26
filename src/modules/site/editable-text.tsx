'use client'

import { useState } from 'react'
import { Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface EditableTextProps {
  text: string
  onTextChange: (newText: string) => void
}

export default function EditableText({ text, onTextChange }: EditableTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(text)

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedText(text)
  }

  const handleSave = () => {
    onTextChange(editedText)
    setIsEditing(false)
  }

  return (
    <div 
      className="relative inline-block max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-2 border border-transparent hover:border-gray-300 rounded-[20px] transition-all duration-200 whitespace-pre-wrap break-words">
        {text}
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
        <DialogContent className="sm:max-w-[725px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Edit Text</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="mt-2 min-h-[200px] bg-white"
            placeholder="Enter your text here..."
          />
          <DialogFooter>
            <Button className='bg-white text-black border-none hover:bg-gray-200 hover:text-black' variant="outline" onClick={() => {setIsEditing(false); setIsHovered(false);}}>Cancel</Button>
            <Button className='bg-white text-black hover:bg-gray-200' onClick={() => { handleSave(); setIsHovered(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}