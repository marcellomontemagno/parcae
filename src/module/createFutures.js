import createFuture from "./createFuture"

const createFutures = () => {
  const futures = {}
  return {
    predict: (key) => {
      const future = createFuture()
      futures[key] = future
      return future.promise
    },
    resolve: (key, value) => {
      assertPredicted(futures, key)
      futures[key].resolve(value)
      return futures[key].promise
    },
    reject: (key, value) => {
      assertPredicted(futures, key)
      futures[key].reject(value)
      return futures[key].promise
    }
  }
}

const assertPredicted = (futures, key) => {
  if (!futures[key]) {
    throw `Future with key "${key}" not found, you either forgot to predict this future or the code predicting this future was not invoked.`
  }
}

export default createFutures
