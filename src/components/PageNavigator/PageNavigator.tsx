import React from 'react'
import { Pagination } from 'antd'
import 'antd/dist/reset.css'

interface TableFooterProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PageNavigator: React.FC<TableFooterProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="footer">
    <Pagination
      current={currentPage}
      total={totalPages * 10}
      pageSize={10}
      onChange={onPageChange}
      showSizeChanger={false}
      showQuickJumper
    />
  </div>
)

export default PageNavigator
