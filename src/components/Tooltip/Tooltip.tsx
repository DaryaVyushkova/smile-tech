import React from 'react'
import { Tooltip as AntTooltip } from 'antd'
import 'antd/dist/reset.css'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return <AntTooltip title={content}>{children}</AntTooltip>
}

export default Tooltip
