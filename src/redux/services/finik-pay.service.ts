// src/services/finik-pay.service.ts

import { PRIVATE_API } from "@/api/interceptors";
import { IFinikPayResponse } from "../models/finik-pay.model";

class FinikPayService {
  private BASE_URL = "/api/private/v1/user/balance/replenish/";

  async initiatePayment(amount: number): Promise<IFinikPayResponse> {
    const response = await PRIVATE_API.post<IFinikPayResponse>(
      `${this.BASE_URL}?amount=${amount}`
    );
    return response.data;
  }
}

export const finikPayService = new FinikPayService();