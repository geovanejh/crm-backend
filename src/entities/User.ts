import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Uuid } from "../entities/Uuid";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: Uuid;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;
}
