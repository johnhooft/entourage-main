import React from 'react';

interface ExpandableButtonProps {
    isExpanded: boolean;
    onClick: () => void;
}

export default function ExpandableButton({ isExpanded, onClick }: ExpandableButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 rounded-full bg-gray-200 hover:scale-105 transition-all flex items-center justify-center mr-4 overflow-hidden"
        >
            <div
                className="relative w-5 h-5 rounded-full"
                style={{
                    transition: 'transform 0.3s ease-in-out',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
            >
                <svg
                    className="absolute inset-0"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                        opacity: isExpanded ? 0 : 1,
                        transform: isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)',
                    }}
                >
                    <path d="M10 4V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 10H16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg
                    className="absolute inset-0"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                        opacity: isExpanded ? 1 : 0,
                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(90deg)',
                    }}
                >
                    <path d="M4 10H16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </button>
    );
}