export interface LoggerI {
  writeInfo: (...args: any) => void,
  writeError: (...args: any) => void,
  writeWarning: (...args: any) => void
}

export type LogEntry = {
  args: any[]
  level: keyof typeof LEVEL_STYLES
  moduleName: string
  timestamp: string
}

export type LogTransport = (entry: LogEntry) => void

const LEVEL_STYLES = {
  info:  "background: #499cc8; color: white;",
  error: "background: #c14a4f; color: white;",
  warn:  "background: #e0a270; color: black;",
} as const

const modules = new Set<string>()

export class Logger implements LoggerI {
  moduleName: string
  static onLog: LogTransport | null = null
  static packageName: string = ""

  constructor(moduleName: string) {
    this.moduleName = moduleName
  }

  private log = (level: keyof typeof LEVEL_STYLES) => (...args: any) => {
    if (!modules.has(this.moduleName)) return

    console[level](
      `%c${Logger.packagePrefix()}${this.moduleName}`,
      `${LEVEL_STYLES[level]} padding: 2px 6px;`,
      ...args,
    )

    if (Logger.onLog) {
      try {
        Logger.onLog({ args, level, moduleName: this.moduleName, timestamp: new Date().toISOString() })
      } catch (_) {}
    }
  }

  writeInfo    = this.log("info")
  writeError   = this.log("error")
  writeWarning = this.log("warn")

  static addModules = (m: string[]) => { m.forEach((name) => modules.add(name)) }
  static removeModules = (m: string[]) => { m.forEach((name) => modules.delete(name)) }
  static clearModules = () => { modules.clear() }
  static getModules = (): string[] => [...modules]
  private static packagePrefix = () => !!this.packageName
                                       ? `${this.packageName} : `
                                       : ""
}

if (typeof window !== `undefined`) window.Logger = Logger
