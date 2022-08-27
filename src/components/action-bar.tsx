import './action-bar.css';
import { useActions } from '../hooks/use-actions';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import ActionButton from '../components/action-button';

interface ActionBarProps {
  id: string;
}

const theme = true;

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton icon={<FiArrowUp />} onClick={() => moveCell(id, 'up')} />
      <ActionButton
        icon={<FiArrowDown />}
        onClick={() => moveCell(id, 'down')}
      />
      <ActionButton icon={<MdClose />} onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
