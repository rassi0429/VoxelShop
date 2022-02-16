// TODO
import { Slot } from "./slot"
import { v4 as uuidv4 } from "uuid"
import { NeosJson } from "./index"

export class NeosJsonUtil {
  static exportJson (json: NeosJson): string {
    return JSON.stringify({
      Object: json.getRootSlot()
    })
  }
}