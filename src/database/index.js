import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import Gs_municipio from '../app/models/gs_municipio';
import Person from '../app/models/person';

const models = [Gs_municipio, Person];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
