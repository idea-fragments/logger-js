import { Logger } from "./index"

beforeEach(() => {
  Logger.clearModules()
  Logger.addModules(["TestModule"])
  Logger.packageName = ""
})

const TIMESTAMP_PATTERN = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}/

describe("Logger log format", () => {
  it("prefixes info logs with timestamp and level indicator", () => {
    const spy = jest.spyOn(console, "info").mockImplementation(() => {})
    const logger = new Logger("TestModule")

    logger.writeInfo("[request:start]", { method: "GET" })

    expect(spy).toHaveBeenCalledTimes(1)
    const firstArg = spy.mock.calls[0][0]

    // First arg should contain the timestamp and level
    expect(firstArg).toMatch(TIMESTAMP_PATTERN)
    expect(firstArg).toContain(" I ")

    spy.mockRestore()
  })

  it("prefixes error logs with timestamp and level indicator", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})
    const logger = new Logger("TestModule")

    logger.writeError("something broke")

    expect(spy).toHaveBeenCalledTimes(1)
    const firstArg = spy.mock.calls[0][0]

    expect(firstArg).toMatch(TIMESTAMP_PATTERN)
    expect(firstArg).toContain(" E ")

    spy.mockRestore()
  })

  it("prefixes warning logs with timestamp and level indicator", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {})
    const logger = new Logger("TestModule")

    logger.writeWarning("heads up")

    expect(spy).toHaveBeenCalledTimes(1)
    const firstArg = spy.mock.calls[0][0]

    expect(firstArg).toMatch(TIMESTAMP_PATTERN)
    expect(firstArg).toContain(" W ")

    spy.mockRestore()
  })

  it("includes module name in the log line", () => {
    const spy = jest.spyOn(console, "info").mockImplementation(() => {})
    const logger = new Logger("TestModule")

    logger.writeInfo("hello")

    const firstArg = spy.mock.calls[0][0]
    expect(firstArg).toContain("TestModule")

    spy.mockRestore()
  })

  it("passes through additional arguments", () => {
    const spy = jest.spyOn(console, "info").mockImplementation(() => {})
    const logger = new Logger("TestModule")

    logger.writeInfo("[test:msg]", { foo: "bar" })

    const args = spy.mock.calls[0]
    // The additional args should be present after the formatted prefix
    expect(args).toContainEqual({ foo: "bar" })

    spy.mockRestore()
  })
})
