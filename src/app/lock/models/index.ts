export interface OTPResponse {
  otp: string;
  expiration: Date;
}

export interface Device {
  uuid: string; 
  model: string; 
  status: string;
}

export interface DeviceListResponse {
  devices: Device[];
}