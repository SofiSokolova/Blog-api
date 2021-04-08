import * as fs from 'fs';
import * as moment from 'moment';

const name = process.argv[2].replace('name=', '') as any;
const timestamp = moment().valueOf();

function create() {
  fs.writeFileSync(`src/migrations/${timestamp}_${name}.ts`, migrationData);
}

const migrationData = `
export default {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
  },
  async down(queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
`;
create();
