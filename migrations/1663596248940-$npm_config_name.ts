import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1663596248940 implements MigrationInterface {
  name = '$npmConfigName1663596248940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`ban_message\` varchar(1000) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deleted_till\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`deleted_till\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`ban_message\``,
    );
  }
}
