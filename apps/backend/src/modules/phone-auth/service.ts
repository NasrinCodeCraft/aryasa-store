import {
  AbstractAuthModuleProvider,
  MedusaError,
} from "@medusajs/framework/utils"

import type {
  AuthenticationInput,
  AuthenticationResponse,
  AuthIdentityProviderService,
} from "@medusajs/types"

import jwt from "jsonwebtoken"

type Options = {
  jwtSecret: string
}

type InjectedDependencies = {
  logger: any
}

class PhoneAuthProviderService extends AbstractAuthModuleProvider {
  static identifier = "phone-auth"
  static DISPLAY_NAME = "Phone Auth"

  protected options_: Options
  protected logger_: any

  constructor(
    container: InjectedDependencies,
    options: Options
  ) {
    // @ts-ignore
    super(...arguments)

    this.options_ = options
    this.logger_ = container.logger
  }

  static validateOptions(options: Record<string, any>) {
    if (!options.jwtSecret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "jwtSecret is required"
      )
    }
  }

  /**
   * Register customer authentication identity
   */
  async register(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService
  ): Promise<AuthenticationResponse> {

    const phone = this.normalizePhone(
      data.body?.phone
    )

    if (!phone) {
      return {
        success: false,
        error: "شماره موبایل معتبر نیست",
      }
    }

    try {
      await authIdentityProviderService.retrieve({
        entity_id: phone,
      })

      return {
        success: false,
        error: "این شماره موبایل قبلاً ثبت شده است",
      }

    } catch {
      const authIdentity =
        await authIdentityProviderService.create({
          entity_id: phone,
        })

      return {
        success: true,
        authIdentity,
      }
    }
  }

  /**
   * Send OTP
   */
  async authenticate(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService
  ): Promise<AuthenticationResponse> {

    const phone = this.normalizePhone(
      data.body?.phone
    )

    if (!phone) {
      return {
        success: false,
        error: "شماره موبایل معتبر نیست",
      }
    }

    let authIdentity

    try {
      authIdentity =
        await authIdentityProviderService.retrieve({
          entity_id: phone,
        })
    } catch {
      return {
        success: false,
        error: "کاربری با این شماره موبایل پیدا نشد",
      }
    }

    const otp = this.generateOtp()

    const token = jwt.sign(
      {
        otp,
      },
      this.options_.jwtSecret,
      {
        expiresIn: "5m",
      }
    )

    await authIdentityProviderService.update(
      phone,
      {
        provider_metadata: {
          otp: token,
        },
      }
    )

    console.log("")
    console.log("=================================")
    console.log("📱 PHONE OTP")
    console.log("Phone:", phone)
    console.log("OTP:", otp)
    console.log("=================================")
    console.log("")

    return {
      success: true,
      location: "otp",
    }
  }

  /**
   * Verify OTP
   */
  async validateCallback(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService
  ): Promise<AuthenticationResponse> {

    const phone = this.normalizePhone(
      data.query?.phone as string
    )

    const otp = data.query?.otp as string

    if (!phone || !otp) {
      return {
        success: false,
        error: "شماره موبایل و کد تایید الزامی هستند",
      }
    }

    let authIdentity

    try {
      authIdentity =
        await authIdentityProviderService.retrieve({
          entity_id: phone,
        })
    } catch {
      return {
        success: false,
        error: "کاربر پیدا نشد",
      }
    }

    const providerIdentity =
      authIdentity.provider_identities?.find(
        (provider) =>
          provider.provider === this.identifier
      )

    if (
      !providerIdentity ||
      !providerIdentity.provider_metadata?.otp
    ) {
      return {
        success: false,
        error: "کد تایید برای این شماره وجود ندارد",
      }
    }

    try {

      const decoded = jwt.verify(
        providerIdentity.provider_metadata.otp as string,
        this.options_.jwtSecret
      ) as {
        otp: string
      }

      if (decoded.otp !== otp) {
        return {
          success: false,
          error: "کد تایید اشتباه است",
        }
      }

    } catch {
      return {
        success: false,
        error: "کد تایید منقضی شده یا اشتباه است",
      }
    }

    /**
     * OTP consumed
     */
    const updatedIdentity =
      await authIdentityProviderService.update(
        phone,
        {
          provider_metadata: {
            otp: null,
          },
        }
      )

    return {
      success: true,
      authIdentity: updatedIdentity,
    }
  }

  async getAuthIdentity(
    authIdentityId: string
  ): Promise<Record<string, any>> {
    return {
      id: authIdentityId,
    }
  }

  async update(
    authIdentityId: string,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return {
      id: authIdentityId,
      ...data,
    }
  }

  async delete(
    authIdentityId: string
  ): Promise<void> {
    return
  }

  private normalizePhone(
    phone?: string
  ): string | null {

    if (!phone) {
      return null
    }

    let normalized = phone.trim()

    if (normalized.startsWith("+98")) {
      normalized =
        "0" + normalized.substring(3)
    }

    normalized =
      normalized.replace(/\D/g, "")

    if (
      normalized.startsWith("9") &&
      normalized.length === 10
    ) {
      normalized =
        "0" + normalized
    }

    if (!/^09\d{9}$/.test(normalized)) {
      return null
    }

    return normalized
  }

  private generateOtp(): string {

    return Math.floor(
      100000 +
      Math.random() * 900000
    ).toString()
  }
}

export default PhoneAuthProviderService