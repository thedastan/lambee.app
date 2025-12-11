// src/api/auth/auth.service.ts
import { PUBLIC_API } from "@/api/interceptors";
import {
	IAuthPairResponse,
	IAuthSendCodeRequest,
	IAuthVerifyCodeRequest,
	IAuthVerifyCodeResponse,
	IForgotResetPasswordRequest,
	IForgotResetPasswordResponse,
	IForgotSendCodeRequest,
	IForgotSendCodeResponse,
	IForgotVerifyCodeRequest,
	IForgotVerifyCodeResponse,
	IIsoCodesResponse,
} from "../models/auth.model";

class AuthService {
	private BASE_URL = "/api/public/v1/auth/";

	async getIsoCodes() {
		const response = await PUBLIC_API.get<IIsoCodesResponse>(
			this.BASE_URL + `iso_codes`
		);
		return response.data;
	}

	async sendCode(data: IAuthSendCodeRequest) {
		const url = this.BASE_URL + "send_code/";
		const response = await PUBLIC_API.post(url, data);
		return response.data;
	}

	async verifyCode(data: IAuthVerifyCodeRequest) {
		const response = await PUBLIC_API.post<IAuthVerifyCodeResponse>(
			this.BASE_URL + "verify_code/",
			data
		);
		return response.data;
	}

	async pair(data: { iso_code_id: number; phone: string; password: string }) {
		const response = await PUBLIC_API.post<IAuthPairResponse>(
			this.BASE_URL + `pair`,
			data
		);
		return response.data;
	}

  /// forgot password methods


  async sendForgotCode(data: IForgotSendCodeRequest) {
    const response = await PUBLIC_API.post<IForgotSendCodeResponse>(
      this.BASE_URL + "forgot_password/send_code/",
      data
    );
    return response.data;
  }

  async verifyForgotCode(data: IForgotVerifyCodeRequest) {
    const response = await PUBLIC_API.post<IForgotVerifyCodeResponse>(
      this.BASE_URL + "forgot_password/verify_code/",
      data
    );
    return response.data;
  }

  async resetPassword(data: IForgotResetPasswordRequest) {
    const response = await PUBLIC_API.post<IForgotResetPasswordResponse>(
      this.BASE_URL + "forgot_password/reset_password/",
      data
    );
    return response.data;
  }
}

export const authService = new AuthService();
