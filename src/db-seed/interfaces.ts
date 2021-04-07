export interface MigrationInterface {
  /**
   * Optional migration name, defaults to class name.
   */
  name?: string;

  /**
   * Run the migrations.
   */
  up(queryRunner: any, Sequelize: any): Promise<any>;

  /**
   * Reverse the migrations.
   */
  down(queryRunner: any, Sequelize: any): Promise<any>;
}
