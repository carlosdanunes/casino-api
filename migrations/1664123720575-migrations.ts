import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1664123720575 implements MigrationInterface {
  name = 'migrations1664123720575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`articles_to_users\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`articleId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles_to_users\` ADD CONSTRAINT \`FK_9627414048d0be6129e75b4c9a3\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles_to_users\` ADD CONSTRAINT \`FK_45ad34c08f1ead6aae805ad96c2\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`articles_to_users\` DROP FOREIGN KEY \`FK_45ad34c08f1ead6aae805ad96c2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles_to_users\` DROP FOREIGN KEY \`FK_9627414048d0be6129e75b4c9a3\``,
    );
    await queryRunner.query(`DROP TABLE \`articles_to_users\``);
  }
}
