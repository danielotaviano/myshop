import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateACartProductTable1601613836061
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'cart_id', type: 'uuid' },
          { name: 'product_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            columnNames: ['cart_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'carts',
          },
          {
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart_product');
  }
}
