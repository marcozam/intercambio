export interface OTPResponse {
  otp: string
}

export interface Device {
  uuid: string; 
  model: string; 
  status: string;
}

export interface DeviceListResponse {
  devices: Device[];
}