import { v4 as uuidv4 } from "uuid"

export class ComponentBase {
  Type: string
  Data: ComponentDataBase
  constructor (type: string) {
    this.Type = type
  }
}

export class ComponentDataBase {
  ID: string = uuidv4()
  "persistent-ID": string = uuidv4()
  UpdateOrder: IComponentDataUpdateOrder = {
    ID: uuidv4(),
    Data: 0
  }

  Enabled: IComponentDataEnabled = {
    ID: uuidv4(),
    Data: true
  }
}

interface IComponentDataUpdateOrder extends ComponentMember {
  Data: number
}

interface IComponentDataEnabled extends ComponentMember {
  Data: boolean
}

class ComponentMember {
  ID: string
  constructor () {
    this.ID = uuidv4()
  }
}

export class ComponentDataBool extends ComponentMember {
  Data: boolean
  constructor () {
    super()
    this.Data = false
  }
}

export class ComponentDataNumber extends ComponentMember {
  Data: number
  constructor () {
    super()
    this.Data = 0
  }
}

export class ComponentDataString extends ComponentMember {
  Data: string | null
  constructor () {
    super()
    this.Data = null
  }
}

export class ComponentDataUnknown extends ComponentMember {
  Data: any
  constructor () {
    super()
    this.Data = null
  }
}