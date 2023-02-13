import { Dialect, Sequelize } from 'sequelize';


const [database, username, password, host, port, dialect] = [
	process.env.DB_NAME as string,
	process.env.DB_USER as string,
	process.env.DB_PASS,
	process.env.DB_HOST,
	5432,
	process.env.DB_TYPE as Dialect,
]

export const sequelize = new Sequelize(
	database, username, password, {
	host, port, dialect,
	logging: () => { console.log(" ") }
});

