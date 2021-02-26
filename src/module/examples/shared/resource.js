const resource = {
  asyncGetA: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("a")
      }, 2000)
    })
  },
  asyncGetB: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("b")
      }, 1000)
    })
  }
};

export default resource;
