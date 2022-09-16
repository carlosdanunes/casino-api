import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1666347732734 implements MigrationInterface {
  name = 'migrations1666347732734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`category_to_article\` `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ADD TABLE \`category_to_article\``);
  }
}
