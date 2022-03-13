import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class ratings1646413294444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'ratings',
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
            name: 'rating',
            type: 'varchar',
            isNullable: false
          },

          {
            name: 'noted',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'book_id',
            type: 'int',
            unsigned: true,
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

    await queryRunner.createForeignKeys('ratings', [
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings')
  }
}
