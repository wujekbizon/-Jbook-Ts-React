import './cell-list.css';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from '../components/add-cell';
import React from 'react';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {cells.map((cell) => {
        return (
          <React.Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CellList;
