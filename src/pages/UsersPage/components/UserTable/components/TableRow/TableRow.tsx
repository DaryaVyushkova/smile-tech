import React from 'react'
import { User } from 'types/User'
import Tooltip from 'components/Tooltip'

interface RowProps {
  user: User
}

const TableRow: React.FC<RowProps> = ({ user }) => {
  const renderCell = (content: string) => (
    <Tooltip content={content}>
      <div className="table-cell">{content}</div>
    </Tooltip>
  )

  return (
    <tr>
      <td>{renderCell(user.name)}</td>
      <td>{renderCell(user.username)}</td>
      <td>{renderCell(user.email)}</td>
      <td>{renderCell(user.address.city)}</td>
      <td>{renderCell(user.phone)}</td>
      <td>{renderCell(user.company.name)}</td>
    </tr>
  )
}

TableRow.displayName = 'TableRow'

export default TableRow
