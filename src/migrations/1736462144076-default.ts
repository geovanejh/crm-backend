import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736462144076 implements MigrationInterface {
    name = 'Default1736462144076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(255) NOT NULL, \`name\` text NOT NULL, \`document\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
