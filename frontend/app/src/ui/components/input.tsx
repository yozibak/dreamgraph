import { PropsWithChildren } from 'react'

type InputProps<E extends HTMLElement> = React.InputHTMLAttributes<E> &
  Required<Pick<React.InputHTMLAttributes<E>, 'value' | 'onChange'>> & {
    ref?: React.RefObject<E>
  }

export const Input: React.FC<InputProps<HTMLInputElement>> = ({
  value,
  ref,
  onChange,
  className,
}) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={
        'font-semibold text-black text-xl bg-gray-200 border-gray-400 px-2 py-1 min-w-44' +
        className
      }
    />
  )
}

export const Select: React.FC<PropsWithChildren<InputProps<HTMLSelectElement>>> = ({
  ref,
  onChange,
  className,
  children,
  value,
}) => {
  return (
    <select
      ref={ref}
      onChange={onChange}
      className={'appearance-none py-2 text-xl' + className}
      value={value}
    >
      {children}
    </select>
  )
}
