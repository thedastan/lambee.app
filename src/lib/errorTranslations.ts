// src/lib/errorTranslations.ts

export const translateErrorMessage = (message: string): string => {
	const translations: Record<string, string> = {
		"Not enough balance": "Недостаточно средств на балансе",
		"Unauthorized": "Требуется авторизация",
		"Invalid address": "Неверный адрес доставки",
		"Address is required": "Адрес доставки обязателен",
		"Payment method is invalid": "Неверный способ оплаты",
		"First delivery date is required": "Укажите дату первой доставки",
		"Deliveries cannot be empty": "Список доставок не может быть пустым",
		"Items are required": "Товары не указаны",
		"Main product variant ID is required": "Основной вариант товара обязателен",
	};

	return translations[message] || message;
};