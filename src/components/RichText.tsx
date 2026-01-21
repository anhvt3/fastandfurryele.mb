/**
 * RichText Component
 * 
 * Renders text content that may contain:
 * - Plain text
 * - HTML markup (sanitized with DOMPurify)
 * - LaTeX math formulas ($...$ for inline, $$...$$ for block)
 * 
 * Usage:
 * <RichText content="Hello <b>world</b>" />
 * <RichText content="The formula is $x^2 + y^2 = z^2$" />
 * <RichText content="$$\\frac{a}{b} = \\sqrt{c}$$" />
 */

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface RichTextProps {
  content: string | null | undefined;
  className?: string;
}

// Regex patterns for LaTeX detection
const INLINE_MATH_REGEX = /\$([^$]+)\$/g;
const BLOCK_MATH_REGEX = /\$\$([^$]+)\$\$/g;

// Check if content contains LaTeX
function containsLatex(text: string): boolean {
  return INLINE_MATH_REGEX.test(text) || BLOCK_MATH_REGEX.test(text);
}

// Render LaTeX formulas in the text
function renderLatex(text: string): string {
  let result = text;
  
  // First, handle block math ($$...$$)
  result = result.replace(BLOCK_MATH_REGEX, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
    } catch (error) {
      console.warn('[RichText] LaTeX block render error:', error);
      return match; // Return original on error
    }
  });
  
  // Then, handle inline math ($...$)
  result = result.replace(INLINE_MATH_REGEX, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
        strict: false,
      });
    } catch (error) {
      console.warn('[RichText] LaTeX inline render error:', error);
      return match; // Return original on error
    }
  });
  
  return result;
}

// Sanitize HTML content
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'u', 'em', 'strong', 'br', 'p', 'span', 'div',
      'ul', 'ol', 'li', 'a', 'img', 'sub', 'sup', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // KaTeX generated tags
      'math', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub',
      'mfrac', 'msqrt', 'mroot', 'mtable', 'mtr', 'mtd', 'annotation',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'class', 'style',
      'width', 'height', 'aria-hidden', 'focusable', 'role',
      'xmlns', 'encoding', 'displaystyle', 'scriptlevel',
    ],
    ADD_ATTR: ['target'],
  });
}

export const RichText: React.FC<RichTextProps> = ({ content, className = '' }) => {
  const processedContent = useMemo(() => {
    // Handle null/undefined/empty
    if (!content || typeof content !== 'string') {
      return '';
    }
    
    let processed = content;
    
    // Check if content contains LaTeX and render it
    if (containsLatex(content)) {
      processed = renderLatex(processed);
    }
    
    // Sanitize final HTML
    return sanitizeHtml(processed);
  }, [content]);
  
  // If no content, render nothing
  if (!processedContent) {
    return null;
  }
  
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default RichText;
