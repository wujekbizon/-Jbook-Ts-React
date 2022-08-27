import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
import ThemeButton from '../components/theme-button';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const [theme, setTheme] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div
        data-color-mode={theme ? 'dark' : 'light'}
        className="text-editor"
        ref={ref}
      >
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />

        {theme ? (
          <ThemeButton
            icon={<MdOutlineLightMode className="icon-light" />}
            onClick={() => setTheme(!theme)}
          />
        ) : (
          <ThemeButton
            icon={<MdDarkMode className="icon-dark" />}
            onClick={() => setTheme(!theme)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={cell.content || 'Click to edit'}
          style={{ backgroundColor: '#1d2a38' }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
