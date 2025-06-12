import React from 'react';

export default function DropdownMenu({ label, items, isOpen, onToggle, onMouseEnter, onMouseLeave, handleNavigation }) {
  return (
    <li className="dropdown" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <a onClick={onToggle} style={{ cursor: 'pointer' }}>{label} {isOpen ? '▼' : '▶'}</a>
      <ul className={`dropdown-menu${isOpen ? ' active' : ''}`}>
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.href}
              onClick={item.onClick ? e => item.onClick(e) : e => handleNavigation(e, item.href)}
              target={item.target}
              rel={item.rel}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
} 