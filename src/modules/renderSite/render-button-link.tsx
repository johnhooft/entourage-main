import React from 'react';

interface ScrollButtonExpandedProps {
  text: string;
  url: string;
  style?: React.CSSProperties;
}

export const ScrollButtonLink: React.FC<ScrollButtonExpandedProps> = ({ text, url, style }) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <button onClick={handleClick} className='border-[1px] p-2 rounded-[15px]' style={style}>
      {text}
    </button>
  );
};