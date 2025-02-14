import CredentialsProvider from "next-auth/providers/credentials";

const hardcodedUser = {
    email: "pupu@gmail.com",
    password: "pupu123", // Contraseña en texto plano
    name: "pupu Doe",
    role: "admin",
};

export const CredentialsAuthProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
    },
    async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // Comparar email y contraseña en texto plano
        if (email == hardcodedUser.email && password == hardcodedUser.password) {
            // Retornar los datos del usuario sin la contraseña
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPassword } = hardcodedUser;
            return userWithoutPassword;
        }

        return null;
    },
});
