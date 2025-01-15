import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736724639112 implements MigrationInterface {
    name = 'Default1736724639112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`activationToken\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`activated\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`activated\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`activationToken\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
    }

}
