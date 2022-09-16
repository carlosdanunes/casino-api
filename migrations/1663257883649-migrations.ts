import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1663257883649 implements MigrationInterface {
    name = 'migrations1663257883649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`seed\` varchar(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`seed\``);
    }

}
