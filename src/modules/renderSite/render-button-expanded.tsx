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

  const buttonStyle = {
    ...style,
    borderColor: style.color || 'inherit'
  };

  return (
    <button onClick={onClick} className='border p-2 rounded-[15px]' style={buttonStyle}>
      {text}
    </button>
  );
};
