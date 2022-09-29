import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1663600881585 implements MigrationInterface {
  name = '$npmConfigName1663600881585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_till\` \`deleted_till\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_till\` \`deleted_till\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
