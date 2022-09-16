import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1663319114834 implements MigrationInterface {
    name = 'migrations1663319114834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`publicUrl\` varchar(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`publicUrl\``);
    }

}
