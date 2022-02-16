import {Connection, ConnectionOptions, createConnection} from "typeorm"
import {Model} from "./model"

export class DB {
  private static connection?: Connection

  static async init() {
    const options: ConnectionOptions = {
      type: "mariadb",
      host: process.env.DB_HOST || "db",
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || "mariadb",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "voxel",
      synchronize: true,
      entities: [Model]
    }

    DB.connection = await createConnection(options)
  }

  static getConnection(): Connection {
    if (!DB.connection) {
      throw new Error("DB not init")
    }
    return DB.connection
  }
}