import dotenv from "dotenv";

dotenv.config();
//might have to define env variables
export const db_config = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    DIALECT: process.env.DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
}



export const firebase_service = {
  type: process.env.TYPE || "",
  project_id: process.env.PROJECT_ID || "",
  private_key_id: process.env.PRIVATE_KEY_ID || "",
  private_key: process.env.PRIVATE_KEY || "",
  client_email: process.env.CLIENT_EMAIL || "",
  client_id: process.env.CLIENT_ID || "",
  auth_uri: process.env.AUTH_URI || "",
  token_uri: process.env.TOKEN_URI || "",
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || "",
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || "",
  universe_domain: process.env.UNIVERSE_DOMAIN || ""
}