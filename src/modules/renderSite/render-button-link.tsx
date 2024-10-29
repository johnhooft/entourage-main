import React from 'react';

interface ScrollButtonExpandedProps {
  text: string;
  url: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const ScrollButtonLink: React.FC<ScrollButtonExpandedProps> = ({ text, url, textStyle, style }) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const buttonStyle = {
    ...style,
    borderColor: style?.color || 'inherit'
  };

  return (
    <button onClick={handleClick} className='border p-2 rounded-[15px]' style={buttonStyle}>
      <span style={textStyle}>
        {text}
      </span>
    </button>
  );
};
