import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import AppleProvider from 'next-auth/providers/apple'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        if (credentials.username !== process.env.ADMIN_USERNAME) return null

        const user = await prisma.user.findUnique({
          where: { email: 'admin@flat.local' },
        })

        if (user?.passwordHash) {
          // DB에 해시가 있으면 해시로 검증
          const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
          if (!valid) return null
          return user
        }

        // 최초 로그인: env var 비밀번호로 검증 후 해시 저장
        if (credentials.password !== process.env.ADMIN_PASSWORD) return null

        const hash = await bcrypt.hash(credentials.password as string, 12)
        const newUser = await prisma.user.upsert({
          where: { email: 'admin@flat.local' },
          update: { role: 'admin', passwordHash: hash },
          create: {
            email: 'admin@flat.local',
            name: '관리자',
            role: 'admin',
            passwordHash: hash,
          },
        })

        return newUser
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.isAdultVerified = (user as any).isAdultVerified
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.isAdultVerified = token.isAdultVerified as boolean
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
