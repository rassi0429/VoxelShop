export class Logger {
  static info (msg: any, caller?: string) {
    console.log(`[INFO]${Logger.getTimeText()}${caller ? `[${caller}]` : ""} ${msg}`)
  }

  static error (msg: any, caller?: string) {
    console.log(`[EROR]${Logger.getTimeText()}${caller ? `[${caller}]` : ""} ${msg}`)
  }

  static getTimeText () {
    const now = new Date()
    const date = `[${now.getFullYear()}/${Logger.z(now.getMonth())}/${Logger.z(now.getDay())}`
    const time = ` ${Logger.z(now.getHours())}:${Logger.z(now.getMinutes())}:${Logger.z(now.getSeconds())}]`
    return date + time
  }

  static z (str: string | number) {
    return ("0" + str).slice(-2)
  }
}