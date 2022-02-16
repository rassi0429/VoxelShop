import lodash from "lodash"
import deepdash from "deepdash"
import {Slot} from "./slot";

const _ = deepdash(lodash)

// alpha 0.0.1 base fork
export class NeosJson {
  rootSlot: Slot

  constructor(json?: any) {
    this.rootSlot = new Slot("TestSlot")
    _.merge(this.rootSlot, json)
  }

  getRootSlot() {
    return this.rootSlot
  }

  getSlotById(path: string) {
    const result = _.findDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "ID" && value === path) {
        return true
      }
    })
    return result?.parent
  }

  getComponentByName(name: string, slot: any = null): any {
    const result = _.findDeep(slot || this.rootSlot, (value, key, parent, context) => {
      if (key === "Type" && value === name) {
        return true
      }
    })
    return result?.parent
  }

  getComponentById(id: string): any {
    const result = _.findDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "ID" && value === id) {
        return true
      }
    })
    return result?.parent
  }

  getDynamicValueVariable(path: string): string {
    const result = _.findValueDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "Data" && context.parent?.key === "Value" && context.parent?.parent?.value.VariableName.Data === path) {
        return true
      }
    })
    return result
  }

  getDynamicField(path: string): string {
    const result = _.findValueDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "Data" && context.parent?.key === "TargetField" && context.parent?.parent?.value.VariableName.Data === path) {
        return true
      }
    })
    return result
  }

  getURLFromTargetId(id: string): string {
    const result = _.findValueDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "Data" && context.parent?.key === "URL" && context.parent?.value.ID === id) {
        return true
      }
    })
    return result
  }

  getColorFromTargetId(id: string): any {
    const result: any = _.findDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "ID" && value === id) {
        return true
      }
    })
    return result?.parent?.Data
  }

  getDynamicReferenceVariable(path: string): string {
    const result = _.findValueDeep(this.rootSlot, (value, key, parent, context) => {
      if (key === "Data" && context.parent?.key === "Reference" && context.parent?.parent?.value.VariableName.Data === path) {
        return true
      }
    })
    return result
  }
}
