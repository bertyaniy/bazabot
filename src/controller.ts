import TelegramBot from 'node-telegram-bot-api';
import AdminController from './admincontroller';
import { superusers } from './superusers'; // export const superusers = [...];

export default class TelegramBotController {

	bot: TelegramBot;
	hasExecuted: boolean = false;

	constructor(token: string) {
		this.bot = new TelegramBot(token, { polling: true });
	}

	start() {
		this.bot.setMyCommands([
			{ command: '/start', description: "Начать использование бота" },
			{ command: '/info', description: "Информация о боте" },
		])

		this.bot.onText(/\/start/, (msg) => {


			if (msg.from?.id && superusers.includes(msg.from.id)) {
				const ChatId = msg.chat.id;
				const admin = new AdminController(this.bot, ChatId)
				this.bot.sendMessage(msg.chat.id, "Привет, Админ!", {
					reply_markup: {
						inline_keyboard: [[{ text: 'Сделать заказ', callback_data: '/choose' }], [{ text: 'Админ', callback_data: '/admin' },]]
					}

				})

				this.bot.on('callback_query', async (callback_query) => {
					if (!this.hasExecuted) {
						this.hasExecuted = true;
						this.bot.answerCallbackQuery(callback_query.id);
						if (callback_query.data === '/admin') {
							if (callback_query.message) {
								// await this.bot.editMessageReplyMarkup(
								// 	{ inline_keyboard: [] }, { chat_id: callback_query.message.chat.id, message_id: callback_query.message.message_id }
								// ); 
								await this.bot.deleteMessage(ChatId, callback_query.message.message_id as unknown as string);
							}
							admin.enterAdminPanel();
						}

						setTimeout(() => { this.hasExecuted = false }, 1000);
					}

				})


			} else {
				this.bot.sendMessage(msg.chat.id, "Привет, это BazaBot!", {
					reply_markup: {
						inline_keyboard: [[{ text: 'Сделать заказ', callback_data: '/choose' }]]
					}
				})
			}
		})
	}
}