import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class secret1646933518451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'secret',
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
            name: 'resource_by',
            type: 'int',
            unsigned: true,
            isNullable: false
          },

          {
            name: 'resource_type',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'access_token',
            type: 'text',
            isNullable: false
          },
          {
            name: 'expired_at',
            type: 'timestampz',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: new Date()
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('secret')
  }
}
