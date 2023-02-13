import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.TELEGRAM_TOKEN as string;

import TelegramBotController from './controller.js';
import { Category } from './essences/models/category.js';
import { Product } from './essences/models/product.js';
import { sequelize } from './utils/database.js';

(async function bootstrap() {

	try {
		const bot = new TelegramBotController(TOKEN);
		bot.start();

		const product = new Product;
		const category = new Category;

		await sequelize.authenticate();
		await sequelize.sync();
	} catch (e) {
		console.log(e);
	}

})();