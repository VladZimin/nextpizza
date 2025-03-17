import {AuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import {UserRole} from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import {prisma} from '@/prisma/prisma-client'
import {compare, hashSync} from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: UserRole.USER,
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const values = {
          email: credentials.email
        }

        const user = await prisma.user.findFirst({
          where: values
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }

        if (!user.verified) {
          return null
        }

        return {
          id: user.id,
          name: user.fullName,
          role: user.role,
          email: user.email,

        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({token}) {
      if (!token.email) {
        return token
      }

      const user = await prisma.user.findFirst({
        where: {
          email: token.email,
        }
      })

      if (user) {
        token.email = user.email
        token.id = String(user.id)
        token.fullName = user.fullName
        token.role = user.role
      }
      return token
    },
    session: ({session, token}) => {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    }
  }
}
