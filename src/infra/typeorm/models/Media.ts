import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SUPPORTED_MEDIA_TYPE } from "../../../medias/domain/types";

@Entity({
  name: "t_media",
})
export class Media {
  @PrimaryGeneratedColumn("uuid")
  @Column({
    primary: true,
    type: "uuid",
    nullable: false,
    unique: true,
  })
  declare id: string;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true,
  })
  declare link: string;

  @Column({
    nullable: false,
    type: "varchar",
    unique: false,
  })
  declare name: string;

  @Column({
    type: "varchar",
    charset: "utf-8",
  })
  declare description: string;

  @Column({
    type: "enum",
    charset: "utf-8",
    nullable: false,
    enum: Object.values(SUPPORTED_MEDIA_TYPE),
  })
  declare type: SUPPORTED_MEDIA_TYPE;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt?: Date;
}
