import TelegramBot from 'node-telegram-bot-api';
import CategoryController from './essences/controllers/category';
import ProductController from './essences/controllers/product';

export default class AdminController {
	bot: TelegramBot;
	chatId: number | undefined;

	constructor(bot: TelegramBot, chatId: number | undefined) {
		this.bot = bot;
		this.chatId = chatId;
	}

	enterAdminPanel() {
		try {
			if (this.chatId) {
				this.renderAdminPanel();
			}

		} catch (error) {
			console.log(error);
		}
	}

	renderAdminPanel() {

		if (this.chatId)
			this.bot.sendMessage(this.chatId, "Выберите цель: ", {
				reply_markup: {
					inline_keyboard: [
						[
							{ text: 'Категории', callback_data: '/categorydata' },
							{ text: 'Продукты', callback_data: '/productdata' }
						]
					]
				}
			})

		this.bot.on('callback_query', async (callback_query) => {
			let hasExecuted = false
			if (!hasExecuted) {
				hasExecuted = true;
				this.bot.answerCallbackQuery(callback_query.id);
				const categoryData = callback_query.data;
				if (callback_query.data === '/categorydata' || callback_query.data === '/productdata') {
					if (callback_query.message && this.chatId) await this.bot.deleteMessage(this.chatId, String(callback_query.message.message_id));
					this.chooseAdminOptions(categoryData);
				}

				setTimeout(() => { hasExecuted = false; }, 1000);
			}
		})
	}

	chooseAdminOptions(categoryData: string | undefined) {
		if (this.chatId) {
			const category = new CategoryController(this.bot, this.chatId);
			const product = new ProductController(this.bot, this.chatId);
			if (categoryData === '/categorydata') {
				this.bot.sendMessage(this.chatId, 'Выберите цель : ', {
					reply_markup: {
						inline_keyboard: [
							[
								{ text: 'Создать', callback_data: '/createcategory' },
								{ text: 'Изменить', callback_data: '/editcategory' },
								{ text: 'Удалить', callback_data: '/deletecategory' }
							]
						]
					}
				})
			}

			if (categoryData === '/productdata') {
				this.bot.sendMessage(this.chatId, 'Выберите цель: ', {
					reply_markup: {
						inline_keyboard: [
							[
								{ text: 'Создать', callback_data: '/createproduct' },
								{ text: 'Изменить', callback_data: '/editproduct' },
								{ text: 'Удалить', callback_data: '/deleteproduct' }
							]
						]
					}
				})
			}

			this.bot.on('callback_query', async (callback_query) => {
				let hasExecuted = false
				if (!hasExecuted) {
					hasExecuted = true;
					if (callback_query.data === '/createcategory') { category.create(); }
					if (callback_query.data === '/editcategory') { category.edit(); }
					if (callback_query.data === '/deletecategory') { category.delete(); }

					if (callback_query.data === '/createproduct') { product.create(); }
					if (callback_query.data === '/editproduct') { product.edit(); }
					if (callback_query.data === '/deleteproduct') { product.delete(); }

					if (callback_query.message && this.chatId) await this.bot.deleteMessage(this.chatId, callback_query.message.message_id as unknown as string);


					setTimeout(() => { hasExecuted = false }, 1000);
				}
			});
		}
	}

}