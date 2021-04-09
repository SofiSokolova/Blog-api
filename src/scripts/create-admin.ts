import * as fs from 'fs';
import * as moment from 'moment';

const name = process.argv[2].replace('name=', '') as any;
const timestamp = moment().valueOf();

function create() {
  fs.writeFileSync(`src/db/seeds/${timestamp}_${name}.ts`, migrationData);
  console.log('Admin created successfully');
}

const migrationData = `
import { QueryInterface, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    // logic for transforming into the new state
  },
  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    // logic for reverting the changes
  },
};
`;
create();
