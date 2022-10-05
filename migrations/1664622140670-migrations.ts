import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1664622140670 implements MigrationInterface {
    name = 'migrations1664622140670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`ban_message\` \`ban_message\` varchar(1000) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`ban_message\` \`ban_message\` varchar(1000) NOT NULL`);
    }

}
