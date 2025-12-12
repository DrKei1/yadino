
import React from 'react';

interface TextFormatterProps {
  text: string;
}

const TextFormatter: React.FC<TextFormatterProps> = ({ text }) => {
  const parts: React.ReactNode[] = [];
  // Regex to capture either inline code or block code markers
  const regex = /(__INLINE_CODE_START__.*?__INLINE_CODE_END__)|(__BLOCK_CODE_START__.*?__BLOCK_CODE_END__)/gs;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add preceding plain text
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) { // Inline code match
      // FIX: Correctly remove both start and end inline code markers
      const inlineContent = match[1].replace(/__INLINE_CODE_START__|__INLINE_CODE_END__/g, '');
      parts.push(
        <strong key={`inline-${match.index}`}>
          <span className="text-orange-500 dark:text-orange-400">
            {inlineContent}
          </span>
        </strong>
      );
    } else if (match[2]) { // Block code match
      // FIX: Correctly remove both start and end block code markers
      const blockContent = match[2].replace(/__BLOCK_CODE_START__|__BLOCK_CODE_END__/g, '');
      parts.push(
        <pre key={`block-${match.index}`} className="my-2 p-3 bg-slate-200/50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 overflow-x-auto text-left" dir="ltr">
          <code className="font-mono whitespace-pre-wrap">
            {blockContent.trim()}
          </code>
        </pre>
      );
    }
    lastIndex = regex.lastIndex;
  }

  // Add any remaining plain text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
};

export default TextFormatter;