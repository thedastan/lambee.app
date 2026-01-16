// src/api/user/user.model.ts

// ISO код страны (флаг, код)
export interface IsoCode {
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

// Баланс пользователя
export interface IUserBalance {
  amount: number;
  created_at: string;
  modified_at: string;
}

// Бонусный баланс
export interface BonusBalance {
  amount: number;
  created_at: string;
  modified_at: string;
}

// Полный профиль пользователя — ответ от /api/private/v1/user/me/
export interface IUserProfile {
  profile_picture: string;
  name: string;
  surname: string;
  iso_code: IsoCode;
  phone: string;
  birth_date: string;
  referral_code: string;
  shipping_addresses: IShippingAddress[];
  balance: IUserBalance;
  bonus_balance: BonusBalance;
  invited_users_amount: number;
  earned_bonus: number;
}

// Тип данных для PATCH-запроса обновления профиля
// Только те поля, которые можно редактировать через форму
export interface IUpdateProfileRequest {
  name?: string;
  surname?: string;
  birth_date?: string;
  phone?: string;
  password?: string;
}