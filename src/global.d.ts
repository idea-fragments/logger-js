import { Logger } from "index"

declare global {
  interface Window {
    Logger: typeof Logger,
  }
}
