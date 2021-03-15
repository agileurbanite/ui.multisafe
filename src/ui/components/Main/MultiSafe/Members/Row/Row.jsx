import { useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Actions } from '../Actions/Actions';

export const Row = ({ members, classNames }) => {
  const [isHovered, setHovered] = useState({});

  const handleMouseEnter = (index) => () => {
    setHovered((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = (index) => () => {
    setHovered((prevState) => ({ ...prevState, [index]: false }));
  };

  return (
    <>
      {members.map((member, idx) => (
        <TableRow
          key={member.memberName}
          className={classNames?.tableRow}
          onMouseEnter={handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave(idx)}>
          <TableCell className={classNames?.tableCell}>{member.memberName}</TableCell>
          <TableCell className={classNames?.tableCell}>{member.accountId}</TableCell>
          <TableCell className={classNames?.tableCellActions}>
            {isHovered[idx] && <Actions accountId={member.accountId} />}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
