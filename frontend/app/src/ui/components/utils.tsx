import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * make a context-injected component that 
 * - accepts nullable context value 
 * - only renders when context value is not nullish
 
 * ```ts
 * // example
 * type NullableStore = { foo: string } | undefined
 *
 * const Context = createContext<NonNullable<NullableStore>>({} as NonNullable<NullableStore>)
 *
 * const Comp = withNullableContext(Context, () => {
 *   const value = useContext(Context) // it always gets concrete value
 *   return <>{value.foo}</>
 * })
 *
 * // it can pass undefined and it won't render
 * const Example: React.FC = () => {
 *  const store: NullableStore = undefined
 *  return <Comp nullableContextValue={store} />
 * }
 * ```
 */
export const withNullableContext =
  <CtxType,>(
    Context: React.Context<CtxType>,
    Component: React.FC
  ): React.FC<{ nullableContextValue: CtxType | undefined }> =>
  ({ nullableContextValue }) => {
    if (!nullableContextValue) return <></>
    return (
      <Context.Provider value={nullableContextValue}>
        <Component />
      </Context.Provider>
    )
  }
