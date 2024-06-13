import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndicator1718267988118 implements MigrationInterface {
    name = 'AddIndicator1718267988118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "indicator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "goal" character varying NOT NULL, "value" character varying NOT NULL, "type" character varying NOT NULL, "month" character varying NOT NULL, "departmentId" character varying NOT NULL, CONSTRAINT "PK_4693fe4c2cb912a71e05c589e7e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "indicator"`);
    }

}
