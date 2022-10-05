import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1664621331486 implements MigrationInterface {
    name = 'migrations1664621331486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_till\` \`deleted_till\` datetime(6) NULL DEFAULT '19000101'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_till\` \`deleted_till\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
