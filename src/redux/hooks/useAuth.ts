// src/api/auth/useAuth.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import {
  IAuthSendCodeRequest,
  IAuthVerifyCodeRequest,
  IForgotResetPasswordRequest,
  IForgotSendCodeRequest,
  IForgotVerifyCodeRequest
} from "../models/auth.model";

export function useSendCode() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IAuthSendCodeRequest) => authService.sendCode(data),
  });
  return { sendCode: mutateAsync, isSending: isPending, error };
}

export function useVerifyCode() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IAuthVerifyCodeRequest) => authService.verifyCode(data),
  });
  return { verifyCode: mutateAsync, isVerifying: isPending, error };
}

export function useLogin() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: { iso_code_id: number; phone: string; password: string }) =>
      authService.pair(data),
  });
  return { login: mutateAsync, isLoggingIn: isPending, error };
}


/// forgot password hooks


export function useSendForgotCode() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IForgotSendCodeRequest) => authService.sendForgotCode(data),
  });

  return {
    sendForgotCode: mutateAsync,
    isSending: isPending,
    error,
  };
}

export function useVerifyForgotCode() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IForgotVerifyCodeRequest) => authService.verifyForgotCode(data),
  });

  return {
    verifyForgotCode: mutateAsync,
    isVerifying: isPending,
    error,
  };
}

export function useResetPassword() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IForgotResetPasswordRequest) => authService.resetPassword(data),
  });

  return {
    resetPassword: mutateAsync,
    isResetting: isPending,
    error,
  };
}