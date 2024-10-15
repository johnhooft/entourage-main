import React from 'react';

interface ScrollButtonExpandedProps {
  text: string;
  style: React.CSSProperties;
  onExpand: (page: string) => void;
  page: string;
}

export const ScrollButtonExpanded: React.FC<ScrollButtonExpandedProps> = ({ text, style, onExpand, page }) => {
  const onClick = () => {
    onExpand(page);
  };

  return (
    <button onClick={onClick} className='border-[1px] p-2 rounded-[15px]' style={style}>
      {text}
    </button>
  );
};