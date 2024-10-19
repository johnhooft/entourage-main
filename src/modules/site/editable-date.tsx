import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EditableDateProps {
  value: Date | string;
  onChange?: (newDate: Date) => void;
}

const EditableDate: React.FC<EditableDateProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleChange = (newDate: Date) => {
        if (onChange) {
            onChange(newDate);
        }
        setIsOpen(false);
    };

    const dateValue = value instanceof Date ? value : new Date(value);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="editable-date relative">
            <button
                onClick={handleButtonClick}
                className="editable-date__button flex flex-row p-2 border border-transparent hover:border-gray-300 rounded-[20px] transition-all duration-200"
            >
                <span className="editable-date__display">{formatDate(dateValue)}</span>
            </button>
            {isOpen && (
                <div ref={datePickerRef} className="absolute top-full left-0 mt-2 z-10">
                    <DatePicker
                        selected={dateValue}
                        onChange={(date: Date | null) => handleChange(date || new Date())}
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default EditableDate;
