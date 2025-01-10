import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  document: string;

  constructor(name: string, document: string) {
    this.name = name;
    this.document = document;
  }
}
