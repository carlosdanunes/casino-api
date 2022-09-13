import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1662978112077 implements MigrationInterface {
    name = '$npmConfigName1662978112077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_deleted\``);
    }

}
