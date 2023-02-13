import TelegramBot from 'node-telegram-bot-api';

export default class CategoryController {
	bot: TelegramBot;
	chatId: number | undefined;

	constructor(bot: TelegramBot, chatId: number | undefined) {
		this.bot = bot;
		this.chatId = chatId;
	}

	create() {
		console.log('created category');
	}

	edit() {
		console.log('changed category');
	}

	delete() {
		console.log('deleted category');
	}
}