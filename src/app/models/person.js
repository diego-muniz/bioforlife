import Sequelize, { Model } from 'sequelize';

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_person: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
        rg: Sequelize.STRING,
        cpf: Sequelize.STRING,
        data_inclusao: Sequelize.DATE,
        dta_nascimento: Sequelize.DATE,
        address_comp: Sequelize.STRING,
        address_CEP: Sequelize.STRING,
        address: Sequelize.STRING,
        address_neighbour: Sequelize.STRING,
        address_city: Sequelize.STRING,
        address_state: Sequelize.STRING,
        residencial_phone: Sequelize.STRING,
        cellphone: Sequelize.STRING,
        nr_apartament: Sequelize.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'person',
      }
    );

    return this;
  }
}

export default Person;
