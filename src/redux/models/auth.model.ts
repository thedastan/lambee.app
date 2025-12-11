// src/api/auth/auth.model.ts

export interface IAuthPairResponse {
	access: string;
	refresh: string;
	new_user: boolean;
}

export interface IAuthSendCodeRequest {
	iso_code_id: number;
	phone: string;
	password: string;
}

export interface IAuthVerifyCodeRequest {
	iso_code_id: number;
	phone: string;
	password: string; // ← ДОБАВЛЕНО
	code: string;
}

export interface IAuthSendCodeResponse {
	detail: {
		message: string;
	};
}

export interface IAuthVerifyCodeResponse {
	detail: {
		access: string;
		refresh: string;
		new_user: boolean;
	};
}

export interface IIsoCodesResponse {
	detail: IsoCode[];
}

export interface IsoCode {
	flag: string;
	iso_code: string;
	created_at: string;
}


// src/api/auth/auth.model.ts

export interface IForgotSendCodeRequest {
  iso_code_id: number;
  phone: string;
}

export interface IForgotVerifyCodeRequest {
  iso_code_id: number;
  phone: string;
  code: string;
}

export interface IForgotResetPasswordRequest {
  iso_code_id: number;
  phone: string;
  password: string;
  code: string;
}

export interface IForgotSendCodeResponse {
  detail: {
    message: string;
  };
}

export interface IForgotVerifyCodeResponse {
  detail: {
    message: string;
  };
}

export interface IForgotResetPasswordResponse {
  detail: {
    access: string;
    refresh: string;
    new_user: boolean;
  };
}
