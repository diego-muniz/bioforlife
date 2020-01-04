import Sequelize, { Model } from 'sequelize';

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_person: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cod_person_resp: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
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
        nr_apartment: Sequelize.INTEGER,
        cod_classification: Sequelize.INTEGER,
        cod_company: Sequelize.INTEGER,
        cod_level: Sequelize.INTEGER,
        cod_times: Sequelize.INTEGER,
        cod_person_visitor: Sequelize.INTEGER,
        dta_visitor: Sequelize.DATE,
        status: Sequelize.INTEGER,
        senha: Sequelize.STRING,
        completo: Sequelize.INTEGER,
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
