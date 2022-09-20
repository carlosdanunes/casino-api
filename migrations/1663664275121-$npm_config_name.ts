import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1663664275121 implements MigrationInterface {
  name = '$npmConfigName1663664275121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`article_likes\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`articleId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_ua\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`title_ru\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_ua\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`text_ru\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_ua\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`subtitle_ru\` varchar(1000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name_ua\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`name_ru\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_likes\` ADD CONSTRAINT \`FK_846944317a442b36888c2a6f488\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_likes\` ADD CONSTRAINT \`FK_cb61d50f9cb3380e28b44312f12\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article_likes\` DROP FOREIGN KEY \`FK_cb61d50f9cb3380e28b44312f12\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_likes\` DROP FOREIGN KEY \`FK_846944317a442b36888c2a6f488\``,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name_ru\``);
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`name_ua\``);
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_ru\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`subtitle_ua\``,
    );
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_ru\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`text_ua\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_ru\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title_ua\``);
    await queryRunner.query(`DROP TABLE \`article_likes\``);
  }
}
