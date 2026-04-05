import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity("users")
export class User {
  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
