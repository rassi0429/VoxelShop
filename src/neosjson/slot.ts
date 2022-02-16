import {v4 as uuidv4} from "uuid"
import {ComponentBase} from "./components"

export class Slot {
  ID: string
  Components: ISlotComponents = {
    ID: uuidv4(),
    Data: []
  }

  Name: ISlotName = {
    ID: uuidv4(),
    Data: ""
  }

  Tag: ISlotTag = {
    ID: uuidv4(),
    Data: null
  }

  Active: ISlotActive = {
    ID: uuidv4(),
    Data: true
  }

  "Persistent-ID": string

  Position: ISlotPosition = {
    ID: uuidv4(),
    Data: [0, 0, 0]
  }

  Rotation: ISlotRotation = {
    ID: uuidv4(),
    Data: [0, 0, 0, 0]
  }

  Scale: ISlotScale = {
    ID: uuidv4(),
    Data: [1, 1, 1]
  }

  OrderOffset: ISlotOrderOffset = {
    ID: uuidv4(),
    Data: 0
  }

  ParentReference: string = uuidv4()
  Children: Slot[] = []

  constructor(name: string) {
    this.ID = uuidv4()
    this.Name.Data = name
  }

  addSlot(name: string) {
    const newSlot = new Slot(name)
    this.Children.push(newSlot)
    return newSlot
  }

  attachComponent(obj: ComponentBase) {
    this.Components.Data.push(obj)
    return this
  }
}

interface ISlotMember {
  ID: string
}

interface ISlotComponents extends ISlotMember {
  Data: object[]
}

interface ISlotName extends ISlotMember {
  Data?: string
}

interface ISlotTag extends ISlotMember {
  Data: string | null
}

interface ISlotActive extends ISlotMember {
  Data: boolean
}

interface ISlotPosition extends ISlotMember {
  Data: [number, number, number]
}

interface ISlotRotation extends ISlotMember {
  Data: [number, number, number, number]
}

interface ISlotScale extends ISlotMember {
  Data: [number, number, number]
}

interface ISlotOrderOffset extends ISlotMember {
  Data: number
}