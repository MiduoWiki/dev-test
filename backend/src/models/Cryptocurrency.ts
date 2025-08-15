import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CryptocurrencyAttributes {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change_24h: string;
  market_cap: string;
  volume_24h: string;
  last_updated: Date;
}

class Cryptocurrency extends Model<CryptocurrencyAttributes> implements CryptocurrencyAttributes {
  public id!: string;
  public name!: string;
  public symbol!: string;
  public price!: string;
  public change_24h!: string;
  public market_cap!: string;
  public volume_24h!: string;
  public last_updated!: Date;
}

export const initCryptocurrencyModel = (sequelize: Sequelize) => {
  Cryptocurrency.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  change_24h: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  market_cap: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  volume_24h: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
      last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Cryptocurrency',
      tableName: 'cryptocurrencies',
      timestamps: false,
    }
  );
};

export default Cryptocurrency;