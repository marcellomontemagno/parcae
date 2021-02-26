import createFutures from "../../createFutures"
import resource from "../shared/resource"

const asyncSequenceExample = async () => {
  const a = await resource.asyncGetA()
  const b = await resource.asyncGetB()
  return a + b
};

const futures = createFutures()

it(`asyncSequenceExample`, async () => {
  jest.spyOn(resource, `asyncGetA`).mockImplementation(() => futures.predict(`keyA`))
  jest.spyOn(resource, `asyncGetB`).mockImplementation(() => futures.predict(`keyB`))
  const promise = asyncSequenceExample()
  expect(resource.asyncGetA).toBeCalledTimes(1)
  expect(resource.asyncGetB).toBeCalledTimes(0)
  await futures.resolve(`keyA`, "resultA")
  expect(resource.asyncGetB).toBeCalledTimes(1)
  await futures.resolve(`keyB`, "resultB")
  const result = await promise
  expect(result).toEqual("resultA" + "resultB")
})
