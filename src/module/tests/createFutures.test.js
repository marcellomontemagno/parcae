import createFutures from "../createFutures"

describe(`createFutures`, () => {

  it(`throws if resolving before predicting`, () => {
    const futures = createFutures()
    try {
      futures.resolve();
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })

  it(`throws if rejecting before predicting`, () => {
    const futures = createFutures()
    try {
      futures.reject();
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })

  it(`resolve flow`, async () => {
    const futures = createFutures()
    const p = futures.predict('aFuture')
    const onResolve = jest.fn()
    const onReject = jest.fn()
    p.then(onResolve)
    p.catch(onReject)
    expect(onResolve).toHaveBeenCalledTimes(0)
    expect(onReject).toHaveBeenCalledTimes(0)
    const p1 = futures.resolve('aFuture', 'aValue')
    expect(p).toStrictEqual(p1)
    await p
    expect(onResolve).toHaveBeenCalledTimes(1)
    expect(onResolve).toHaveBeenCalledWith('aValue')
    expect(onReject).toHaveBeenCalledTimes(0)
  })

  it(`reject flow`, async () => {
    const futures = createFutures()
    const p = futures.predict('aFuture')
    const onResolve = jest.fn()
    const onReject = jest.fn()
    p.catch(onReject)
    p.then(onResolve).catch(() => undefined)
    expect(onResolve).toHaveBeenCalledTimes(0)
    expect(onReject).toHaveBeenCalledTimes(0)
    const p1 = futures.reject('aFuture', 'anError')
    expect(p).toStrictEqual(p1)
    try {
      await p
    } catch (e) {
      expect(e).toEqual('anError')
    }
    expect(onResolve).toHaveBeenCalledTimes(0)
    expect(onReject).toHaveBeenCalledTimes(1)
    expect(onReject).toHaveBeenCalledWith('anError')
  })

})
