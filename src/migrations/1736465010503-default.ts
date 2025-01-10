import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736465010503 implements MigrationInterface {
    name = 'Default1736465010503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` varchar(36) NOT NULL, \`name\` text NOT NULL, \`document\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
