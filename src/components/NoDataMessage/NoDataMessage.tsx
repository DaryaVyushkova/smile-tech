import React from 'react'

import './styles.scss'

interface NoDataMessageProps {
  message: string
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  return <div className="no-data-message">{message}</div>
}

export default NoDataMessage
