import {Logger} from "./logger";
import axios from "axios";
import {NeosJson} from "./neosjson";
import fs from "fs/promises"
import {NeosJsonUtil} from "./neosjson/util";
import {DB} from "./db";
import {Model} from "./db/model";

const Neos = require("@bombitmanbomb/neosjs")

export class NeosBot {
  neos: any

  constructor() {
    this.neos = new Neos()
    this.init()
    setInterval(() => this.init(),10 * 60 * 1000)
  }

  async init() {
    this.neos.Logout()
    this.neos.Login(process.env.NEOS_BOT_ID, process.env.NEOS_BOT_PASSWORD)
    this.neos.on("messageReceived", (msg: any) => this.messageReceived(msg))
    this.neos.on("friendAdded", (friend: any) => this.addFriend(friend))
  }

  addFriend(friend: any) {
    if (friend.FriendStatus === "Requested") {
      Logger.info(`FriendRequest Received from ${friend}`, "Neos")
      this.neos.AddFriend(friend)
    }
  }

  async messageReceived(m: any) {
    Logger.info(`Message Received from ${m.SenderId}`, "Neos")
    try {
      const msg = JSON.parse(m.Content)
      if (!msg.assetUri) {
        this.neos.SendTextMessage(m.senderId, "hello")
      } else {
        const data = await JsonUtil.decompress7zbson(msg.assetUri)
        const itemData = new NeosJson(data)
        // await fs.writeFile("./test.json", JSON.stringify(data))
        // メッシュのURLと、マテリアルの色４つ、テクスチャ６個
        // 箱前面のユーザー名
        // 箱前面の写真URL
        const objectName = itemData.getDynamicValueVariable("name")
        const faceTextureId = itemData.getDynamicField("faceTexture")
        const faceTextureUrl = itemData.getURLFromTargetId(faceTextureId)
        const meshSlotId = itemData.getDynamicReferenceVariable("Instancer.Template")
        const meshSlot = itemData.getSlotById(meshSlotId)
        const meshRenderer = itemData.getComponentByName("FrooxEngine.MeshRenderer", meshSlot)
        // console.log(meshRenderer)
        const materials: any[] = meshRenderer.Data.Materials.Data
        const materialUrls = materials.map(item => {
          const materialSlot = itemData.getComponentById(item.Data)
          const textureSlot = itemData.getComponentById(materialSlot.MainTexture.Data)
          return textureSlot.URL.Data
        })

        const meshId = meshRenderer.Data.Mesh.Data
        const staticMesh = itemData.getComponentById(meshId)
        const staticMeshUrl = staticMesh.URL.Data

        const colorMaterials = ["stage", "box", "detail", "film", "name"]
        let colors: any = {}
        colorMaterials.forEach((key) => {
          const colorId = itemData.getDynamicField(key)
          const color = itemData.getColorFromTargetId(colorId)
          colors[key] = color
        })
        console.log({objectName, staticMeshUrl, materialUrls, faceTextureUrl, colors})
        const connection = DB.getConnection()
        const modelRepository = await connection.getRepository(Model)
        const newModel = new Model(objectName,staticMeshUrl,materialUrls,faceTextureUrl,colors)
        await modelRepository.insert(newModel)

        if (!objectName) {
          this.neos.SendTextMessage(m.SenderId, "アイテムが認識できませんでした。")
          return
        }
      }
    } catch (e) {
      console.log(e)
      this.neos.SendTextMessage(m.SenderId, "アイテムが認識できませんでした。")
    }
  }
}

class JsonUtil {
  static async decompress7zbson(assetUrl: string): Promise<string> {
    const id = assetUrl.replace("neosdb:///", "").replace(".7zbson", "")
    const url = process.env.BZON_DECOMP_URL
    const {data} = await axios.get(url + id)
    return data
  }
}