import './add-cell.css';
import { useActions } from '../hooks/use-actions';
import { BiPlus } from 'react-icons/bi';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`${forceVisible && 'force-visible'} add-cell`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, 'code')}
        >
          <span className="icon is-small">
            <BiPlus />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, 'text')}
        >
          <span className="icon is-small">
            <BiPlus />
          </span>{' '}
          <span>Text</span>
        </button>
      </div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
