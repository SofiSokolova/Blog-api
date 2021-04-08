import * as fs from 'fs';
import * as moment from 'moment';

const name = process.argv[2].replace('name=', '') as any;
const timestamp = moment().valueOf();

function create() {
  fs.writeFileSync(`migrations/${timestamp}_${name}.ts`, migrationData);
}

const migrationData = `
export default class ${name}_${timestamp} {
    up: (
        queryInterface,
        Sequelize,
      ) => {
        // logic for transforming into the new state
      };
      down: (
        queryInterface,
        Sequelize,
      ) => {
        // logic for reverting the changes
      };
}
`;
create();
