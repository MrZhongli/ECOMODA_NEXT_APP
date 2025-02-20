import NextAuth from "next-auth";
import { CredentialsAuthProvider } from "../[...nextauth]";

export const authOptions = {
    providers: [
        CredentialsAuthProvider, // Usa tu proveedor de credenciales
    ],
    secret: process.env.NEXTAUTH_SECRET, // Clave secreta para firmar la sesión
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };