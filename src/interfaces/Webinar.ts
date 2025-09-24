import type { IUserDto } from "./User";

export interface IWebinarDto extends IUserDto {
    webinarId: number,
}

export interface IWebinarRegistration {
  registrationId: number;
  name: string;
  email: string;
  phone: string;
  webinarId: number;
  webinarName: string;
  paymentStatus: boolean;
}
