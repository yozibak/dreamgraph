export default () => {
  afterEach(() => {
    jest.restoreAllMocks()
    console.log('global setup daze')
  })
}
