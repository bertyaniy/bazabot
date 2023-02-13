import { sequelize } from '../../utils/database.js';
import { DataTypes, Model } from 'sequelize';
import { Category } from './category';

class Product extends Model { }

Product.init({
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	disabledAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	categoryId: {
		type: DataTypes.UUID,
		allowNull: true,
	}
}, {
	tableName: 'products',
	paranoid: true,
	deletedAt: 'disabledAt',
	sequelize
});

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export { Product };