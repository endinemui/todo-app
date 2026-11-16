import { forwardRef } from 'react'

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function SunIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
  )
}

export function PlusIcon({ className }) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function CheckIcon({ className }) {
  return (
    <svg {...base} strokeWidth={3} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function TrashIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7" />
      <path d="M6.5 7l.8 11.3A1.8 1.8 0 0 0 9.1 20h5.8a1.8 1.8 0 0 0 1.8-1.7L17.5 7" />
      <path d="M10.5 11v5M13.5 11v5" />
    </svg>
  )
}

export function InboxIcon({ className }) {
  return (
    <svg {...base} strokeWidth={1.5} className={className}>
      <path d="M3 13.5h4l1.2 2.2a1 1 0 0 0 .9.5h5.8a1 1 0 0 0 .9-.5L17 13.5h4" />
      <path d="M4.6 13.5 7.3 6.1A2 2 0 0 1 9.2 4.7h5.6a2 2 0 0 1 1.9 1.4l2.7 7.4v3.3a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2v-3.3Z" />
    </svg>
  )
}

export function SparkIcon({ className }) {
  return (
    <svg {...base} strokeWidth={1.6} className={className}>
      <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" />
    </svg>
  )
}

export const IconButton = forwardRef(function IconButton(
  { className = '', children, label, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full text-muted transition duration-200 ease-spring hover:bg-line/60 hover:text-ink focus-visible:bg-line/60 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
