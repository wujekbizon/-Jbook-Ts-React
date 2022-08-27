import './cell-list-item.css';
import { Cell } from '../redux';
import TextEditor from './text-editor';
import CodeCell from './code-cell';
import ActionBar from '../components/action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      {cell.type === 'code' ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <div>
            <ActionBar id={cell.id} />
          </div>
          <TextEditor cell={cell} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
