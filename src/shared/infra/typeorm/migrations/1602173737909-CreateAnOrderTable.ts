import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnOrderTable1602173737909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'status', type: 'varchar' },
          { name: 'cart_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'total_price', type: 'numeric' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
          {
            columnNames: ['cart_id'],
            referencedTableName: 'carts',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
