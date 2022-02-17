import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm"

@Entity("Model")
export class Model implements IModel {
  @PrimaryGeneratedColumn("increment")
  id!: number;
  @Column({ type: "text", default: null })
  objectName?: string;
  @Column({ type: "text", default: null, unique: true })
  staticMeshUrl: string;
  @Column({ type: "text", default: null })
  materialUrls: string;
  @Column({ type: "text", default: null })
  faceTextureUrl: string;
  @Column({ type: "text", default: null })
  colors: string;

  constructor(objectName: string,
    staticMeshUrl: string,
    materialUrls: any,
    faceTextureUrl: string,
    colors: any) {
    this.objectName = objectName
    this.staticMeshUrl = staticMeshUrl
    this.materialUrls = JSON.stringify(materialUrls)
    this.faceTextureUrl = faceTextureUrl
    this.colors = JSON.stringify(colors)
  }
}

export interface IModel {
  id?: number
  objectName?: string
  staticMeshUrl?: string
  materialUrls?: string
  faceTextureUrl?: string
  colors?: string
}