import {
  loadEnv,
  defineConfig,
} from "@medusajs/framework/utils"

loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd()
)

module.exports = defineConfig({

  projectConfig: {

    databaseUrl:
    process.env.DATABASE_URL,

    http: {

      storeCors:
        process.env.STORE_CORS!,

      adminCors:
        process.env.ADMIN_CORS!,

      authCors:
        process.env.AUTH_CORS!,

      jwtSecret:
      process.env.JWT_SECRET,

      cookieSecret:
      process.env.COOKIE_SECRET,

      authMethodsPerActor: {

        // Admin
        user: [
          "emailpass",
        ],

        // Customer
        customer: [
          "phone-auth",
        ],

      },
    },
  },

  modules: [

    {
      resolve:
        "@medusajs/medusa/auth",

      options: {

        providers: [

          {
            resolve:
              "@medusajs/medusa/auth-emailpass",

            id: "emailpass",
          },

          {
            resolve:
              "./src/modules/phone-auth",

            id: "phone-auth",

            options: {

              jwtSecret:
                process.env.PHONE_AUTH_JWT_SECRET ||
                "dev-phone-secret",

            },
          },

        ],
      },
    },

  ],
})