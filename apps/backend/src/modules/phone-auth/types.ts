export type PhoneAuthOptions = {
  otpLength?: number
  otpExpiresIn?: number
}

export type PhoneAuthData = {
  phone: string
  otp?: string
}