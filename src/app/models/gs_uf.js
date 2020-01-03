import Sequelize, { Model } from 'sequelize';

class Gs_uf extends Model {
  static init(sequelize) {
    super.init(
      {
        CD_UF: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        DS_UF: Sequelize.STRING,
        CD_IBGE: Sequelize.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'gs_uf',
      }
    );

    return this;
  }
}

export default Gs_uf;
