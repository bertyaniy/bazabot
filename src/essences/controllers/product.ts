import TelegramBot from 'node-telegram-bot-api';

export default class ProductController {
	bot: TelegramBot;
	chatId: number | undefined;

	constructor(bot: TelegramBot, chatId: number | undefined) {
		this.bot = bot;
		this.chatId = chatId;
	}

	create() {
		console.log('created product');
	}

	edit() {
		console.log('changed product');
	}

	delete() {
		console.log('deleted product');
	}
}