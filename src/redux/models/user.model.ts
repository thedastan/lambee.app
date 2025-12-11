// src/api/user/user.model.ts

// ISO код страны (флаг, код)
export interface IUserIsoCode {
  flag: string;
  iso_code: string;
  created_at: string;
}

// Адрес доставки
export interface IShippingAddress {
  id: number;
  address: string;
  created_at: string;
}

// Баланс
export interface IUserBalance {
  amount: number;
  created_at: string;
  modified_at: string;
}

// Основной профиль (ответ от /me/)
export interface IUserProfile {
  name: string;
  surname: string;
  birth_date: string;
  // Добавим необязательные поля, если они могут отсутствовать
  profile_picture?: string | null;
  iso_code?: IUserIsoCode;
  phone?: string;
  shipping_addresses?: IShippingAddress[];
  balance?: IUserBalance;
}