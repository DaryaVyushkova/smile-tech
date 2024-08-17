import React from 'react'

export interface IconProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string
  className?: string
  color?: string
  size?: number
}

const Icon: React.FC<IconProps> = ({ icon, className, color, size = 16 }) => {
  if (typeof icon === 'string') {
    return (
      <img
        src={icon}
        className={className}
        width={size}
        height={size}
        alt="icon"
      />
    )
  } else {
    const IconComponent = icon
    return (
      <IconComponent
        className={className}
        width={size}
        height={size}
        fill={color || 'currentColor'}
      />
    )
  }
}

export default Icon
