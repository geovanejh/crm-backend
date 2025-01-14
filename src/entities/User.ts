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

  @Column({ type: "text", nullable: false })
  phone: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "text", nullable: true })
  activationToken: string;

  @Column({ type: "boolean", default: false })
  activated: boolean;
}
