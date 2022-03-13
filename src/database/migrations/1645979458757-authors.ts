import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class authors1645979458757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authors',
        schema: 'public',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            isUnique: true,
            unsigned: true,
            isNullable: false
          },
          {
            name: 'firstname',
            type: 'varchar',
            isNullable: false
          },

          {
            name: 'lastname',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'place_of_birth',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: new Date()
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: new Date()
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('authors')
  }
}
