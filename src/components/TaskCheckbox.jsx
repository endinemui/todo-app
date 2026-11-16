import { CheckIcon } from './icons'

export function TaskCheckbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-[7px] border transition-all duration-200 ease-spring active:scale-90 ${
        checked
          ? 'border-accent bg-accent'
          : 'border-muted/45 bg-transparent hover:border-accent/70 hover:bg-accent-soft'
      }`}
    >
      <CheckIcon
        className={`h-3 w-3 text-accent-ink transition-all duration-200 ease-spring ${
          checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      />
    </button>
  )
}
