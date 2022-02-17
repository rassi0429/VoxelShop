import express from "express"
import {Logger} from "./logger";
import {DB} from "./db";
import {Model} from "./db/model";
import j2e from "json2emap"

// const j2e = require("json2emap")
const app = express()

export class Api {
  constructor() {
    this.init()
  }

  init() {
    app.listen("3000", () => Logger.info("API OK"))
    app.get("/api/models", async (req, res) => {
      const connection = await DB.getConnection()
      const repository = await connection.getRepository(Model)
      let sessionModels = []
      if (req.query.users) {
        // @ts-ignore
        const users = req.query.users.split(",")
        for (const user of users) {
          const userModel = await repository.findOne({where: {objectName: user}})
          if (userModel) sessionModels.push(userModel)
        }
      }
      const models = await repository.find({
        order: {id: "DESC"},
        take: (Number(req.query.limit) || 10) - sessionModels.length
      })
      const fmodels = [...sessionModels,...models].map((m) => formatModel(m))
      res.send(req.query.json ? fmodels : j2e(fmodels))
    })
  }
}

function formatModel(model: Model) {
  return {
    modelName: model.objectName,
    staticMeshUrl: model.staticMeshUrl,
    materialUrls: JSON.parse(model.materialUrls),
    faceTextureUrl: model.faceTextureUrl,
    colors: JSON.parse(model.colors)
  }
}

