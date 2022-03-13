import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class books1645979463141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
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
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'isbn',
            type: 'bigint',
            isUnique: true,
            unsigned: true,
            isNullable: false
          },
          {
            name: 'price',
            type: 'int',
            unsigned: true,
            isNullable: false
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false
          },
          {
            name: 'release_date',
            type: 'date',
            isNullable: false
          },
          {
            name: 'pages',
            type: 'int',
            unsigned: true,
            isNullable: false
          },
          {
            name: 'publisher',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'images',
            type: 'jsonb',
            isNullable: false
          },
          {
            name: 'author_id',
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

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books')
  }
}
