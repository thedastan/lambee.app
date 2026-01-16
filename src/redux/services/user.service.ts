import { PRIVATE_API } from "@/api/interceptors";
import { IUpdateProfileRequest, IUserProfile } from "../models/user.model";

class UserService {
  private BASE_URL = "/api/private/v1/user/";

  async getProfile() {
    const response = await PRIVATE_API.get<IUserProfile>(
      this.BASE_URL + "me/"
    );
    return response.data;
  }

  async updateProfile(data: IUpdateProfileRequest) {
    const response = await PRIVATE_API.patch<IUserProfile>(
      this.BASE_URL + "me/",
      data
    );
    return response.data;
  }

  
  async updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append("profile_picture", file);  

    const response = await PRIVATE_API.post<IUserProfile>(
      this.BASE_URL + "me/profile_picture/",
      formData
    );

    return response.data;
  }

  async createShippingAddress(address: string) {
    const response = await PRIVATE_API.post<
      { id: number; address: string; created_at: string }
    >(this.BASE_URL + "shipping_address/", { address });
    return response.data;
  }

  async deleteShippingAddress(addressId: number) {
    await PRIVATE_API.delete(this.BASE_URL + `shipping_address/${addressId}/`);
  }
}

export const userService = new UserService();
