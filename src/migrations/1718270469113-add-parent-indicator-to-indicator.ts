import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentIndicatorToIndicator1718270469113 implements MigrationInterface {
    name = 'AddParentIndicatorToIndicator1718270469113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "indicator" ADD "parentIndicatorId" character varying`);
        await queryRunner.query(`ALTER TABLE "indicator" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "indicator" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "indicator" DROP COLUMN "parentIndicatorId"`);
    }

}
