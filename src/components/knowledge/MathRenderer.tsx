import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { ReactNode } from 'react';

interface MathRendererProps {
  content: string;
}

// Parse text and render LaTeX formulas
export function MathRenderer({ content }: MathRendererProps) {
  const elements: ReactNode[] = [];
  let key = 0;

  // Split by block math first ($$...$$)
  const blockParts = content.split(/(\$\$[\s\S]*?\$\$)/g);

  for (const blockPart of blockParts) {
    if (blockPart.startsWith('$$') && blockPart.endsWith('$$')) {
      // Block math
      const formula = blockPart.slice(2, -2).trim();
      try {
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto">
            <BlockMath math={formula} />
          </div>
        );
      } catch {
        elements.push(<code key={key++} className="text-destructive">{formula}</code>);
      }
    } else {
      // Process inline math within this part
      const inlineParts = blockPart.split(/(\\\([\s\S]*?\\\)|\$[^$\n]+\$)/g);
      
      for (const part of inlineParts) {
        if (part.startsWith('\\(') && part.endsWith('\\)')) {
          // \(...\) notation
          const formula = part.slice(2, -2);
          try {
            elements.push(<InlineMath key={key++} math={formula} />);
          } catch {
            elements.push(<code key={key++} className="text-destructive">{formula}</code>);
          }
        } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          // $...$ notation
          const formula = part.slice(1, -1);
          try {
            elements.push(<InlineMath key={key++} math={formula} />);
          } catch {
            elements.push(<code key={key++} className="text-destructive">{formula}</code>);
          }
        } else if (part) {
          // Regular text - process markdown
          elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: processMarkdown(part) }} />);
        }
      }
    }
  }

  return <>{elements}</>;
}

// Process markdown syntax
function processMarkdown(text: string): string {
  let html = text;
  
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br/>');
  
  return html;
}

// Render a complete section with headers, lists, etc.
export function ContentRenderer({ content }: MathRendererProps) {
  const lines = content.trim().split('\n');
  const elements: ReactNode[] = [];
  let key = 0;
  let inTable = false;
  let tableRows: string[] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {tableRows.map((row, idx) => {
                const cells = row.split('|').filter(c => c.trim());
                // Skip separator rows
                if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
                  return null;
                }
                const isHeader = idx === 0;
                return (
                  <tr key={idx}>
                    {cells.map((cell, cidx) => {
                      const CellTag = isHeader ? 'th' : 'td';
                      return (
                        <CellTag 
                          key={cidx} 
                          className={`border border-border px-3 py-2 ${isHeader ? 'bg-muted font-semibold text-left' : ''}`}
                        >
                          <MathRenderer content={cell.trim()} />
                        </CellTag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Table row
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      inTable = true;
      tableRows.push(trimmedLine);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold mt-6 mb-2">
          <MathRenderer content={trimmedLine.slice(4)} />
        </h3>
      );
    } else if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold mt-8 mb-3">
          <MathRenderer content={trimmedLine.slice(3)} />
        </h2>
      );
    } else if (trimmedLine.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold mt-8 mb-4">
          <MathRenderer content={trimmedLine.slice(2)} />
        </h1>
      );
    }
    // List items
    else if (trimmedLine.startsWith('- ')) {
      elements.push(
        <li key={key++} className="ml-4 list-disc">
          <MathRenderer content={trimmedLine.slice(2)} />
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmedLine)) {
      const match = trimmedLine.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} className="ml-4 list-decimal">
            <MathRenderer content={match[2]} />
          </li>
        );
      }
    }
    // Regular paragraph
    else if (trimmedLine) {
      elements.push(
        <p key={key++} className="my-2">
          <MathRenderer content={trimmedLine} />
        </p>
      );
    }
    // Empty line
    else {
      elements.push(<div key={key++} className="h-2" />);
    }
  }

  // Flush any remaining table
  flushTable();

  return <div className="space-y-1">{elements}</div>;
}
