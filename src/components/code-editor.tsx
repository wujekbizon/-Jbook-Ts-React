import './code-editor.css';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
// import Highlighter from 'monaco-jsx-highlighter';
// import { parse } from '@babel/parser';
// import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorChange = (code: string | undefined) => {
    onChange(code || '');

    // const highlighter = new Highlighter(
    //   // @ts-ignore
    //   window.monaco,
    //   parse
    // );
  };

  const onformatClick = () => {
    const formattedCode = prettier
      .format(initialValue, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    onChange(formattedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={onformatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <MonacoEditor
        theme="vs-dark"
        height="100%"
        defaultLanguage="javascript"
        defaultValue=""
        value={initialValue}
        onChange={onEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
