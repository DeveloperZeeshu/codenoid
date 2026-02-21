import React from 'react';
import { Text } from '@react-pdf/renderer';

interface Props {
  text: string;
  style?: any;
}

export const renderMarkdownText = (text: string, baseStyle?: any) => {

  if (!text) return null;

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {

    if (part.startsWith('**') && part.endsWith('**')) {

      const clean = part.slice(2, -2);

      return (
        <Text key={index} style={{ ...baseStyle, fontWeight: 'bold' }}>
          {clean}
        </Text>
      );

    }

    if (part.startsWith('`') && part.endsWith('`')) {

      const clean = part.slice(1, -1);

      return (
        <Text
          key={index}
          style={{
            ...baseStyle,
            fontFamily: 'Courier',
            backgroundColor: '#e5e7eb'
          }}
        >
          {clean}
        </Text>
      );

    }

    return (
      <Text key={index} style={baseStyle}>
        {part}
      </Text>
    );

  });

};