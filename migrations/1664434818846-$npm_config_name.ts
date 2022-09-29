import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1664434818846 implements MigrationInterface {
  name = '$npmConfigName1664434818846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name_ua\``);
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name_ru\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name_ru\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name_ua\` varchar(50) NOT NULL`,
    );
  }
}
