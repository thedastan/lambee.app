import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { IUpdateProfileRequest, IUserProfile } from "../models/user.model";

export function useUserProfile() {
  const hasToken =
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("accessToken"));

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userService.getProfile(),
    enabled: hasToken,
  });

  return {
    profile: data,
    isLoading,
    error,
    refetch,
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IUpdateProfileRequest) => userService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    updateProfile: mutateAsync,
    isUpdating: isPending,
  };
}

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (file: File) => userService.updateProfilePicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    updateProfilePicture: mutateAsync,
    isUpdating: isPending,
  };
}


export function useCreateShippingAddress() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (address: string) => userService.createShippingAddress(address),
    onSuccess: () => {
      // Обновляем данные профиля после добавления адреса
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    createShippingAddress: mutateAsync,
    isCreating: isPending,
  };
}


export function useDeleteShippingAddress() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (addressId: number) => userService.deleteShippingAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      // Также можно очистить выбранный адрес из localStorage, если он был удалён
    },
  });

  return {
    deleteShippingAddress: mutateAsync,
    isDeleting: isPending,
  };
}