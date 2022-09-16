import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersHidePropsAdd1662902158931 implements MigrationInterface {
  name = 'UsersHidePropsAdd1662902158931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hide_statistic\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hide_activity\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hide_games\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hide_rewards\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hide_all_data\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`hide_all_data\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`hide_rewards\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`hide_games\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`hide_activity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`hide_statistic\``,
    );
  }
}
