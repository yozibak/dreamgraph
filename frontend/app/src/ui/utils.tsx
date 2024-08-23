/**
 * filters out nullish value and render only when truthy
 * ```ts
 * type Store = { foo: string }
 *
 * const Context = createContext<NonNullable<Store>>({} as NonNullable<Store>)
 *
 * const Comp = withNonNullableContext(Context, () => {
 *   const value = useContext(Context)
 *   return <>{value.foo}</>
 * })
 *
 * now children can get concrete context value
 * const Example: React.FC = () => {
 *  return <Comp nullableContextValue={undefined} />
 * }
 * ```
 */
export const withNonNullableContext =
  <NonNullableCtx,>(
    Context: React.Context<NonNullableCtx>,
    Component: React.FC
  ): React.FC<{ nullableContextValue: NonNullableCtx | undefined }> =>
  ({ nullableContextValue }) => {
    if (!nullableContextValue) return <></>
    return (
      <Context.Provider value={nullableContextValue}>
        <Component />
      </Context.Provider>
    )
  }
