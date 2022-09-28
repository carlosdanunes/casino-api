import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1664372898910 implements MigrationInterface {
  name = '$npmConfigName1664372898910';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_de\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_es\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_fr\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_pt\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_tr\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_de\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_es\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_fr\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_pt\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_tr\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_de\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_es\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_fr\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_pt\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_tr\` varchar(1000) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_tr\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_pt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_fr\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_es\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_de\``,
    );
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_tr\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_pt\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_fr\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_es\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_de\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_tr\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_pt\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_fr\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_es\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_de\``);
  }
}
