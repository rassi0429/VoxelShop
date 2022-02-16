import {NeosBot} from "./neosbot";
import {Logger} from "./logger";
import {DB} from "./db";
import {Api} from "./api";

class Main {
  bot: any = null
  api: any = null
  constructor() {
    Logger.info("Init")
    this.bot = new NeosBot()
    this.api = new Api()
    DB.init()
  }
}

new Main()
