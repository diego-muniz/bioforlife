import Sequelize, { Model } from 'sequelize';

class Gs_municipio extends Model {
  static init(sequelize) {
    super.init(
      {
        CD_IBGE_UF: Sequelize.STRING,
        NR_MESORREGIAO_GEOGRAFICA: Sequelize.STRING,
        NO_MESORREGIAO: Sequelize.STRING,
        NR_MICRORREGIAO_GEOGRAFICA: Sequelize.STRING,
        NO_MICRORREGIAO: Sequelize.STRING,
        CD_MUNICIPIO: Sequelize.STRING,
        CD_MUNICIPIO_COMPLETO: Sequelize.STRING,
        NO_MUNICIPIO: { type: Sequelize.STRING, primaryKey: true },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'gs_municipio',
      }
    );

    return this;
  }
}

export default Gs_municipio;
