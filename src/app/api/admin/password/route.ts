import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: '입력값이 올바르지 않습니다.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email: 'admin@flat.local' } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // 현재 비밀번호 검증
  if (user.passwordHash) {
    const valid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!valid) return NextResponse.json({ error: '현재 비밀번호가 올바르지 않습니다.' }, { status: 400 })
  } else {
    // 아직 해시 없으면 env var와 비교
    if (currentPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: '현재 비밀번호가 올바르지 않습니다.' }, { status: 400 })
    }
  }

  const newHash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({
    where: { email: 'admin@flat.local' },
    data: { passwordHash: newHash },
  })

  return NextResponse.json({ ok: true })
}
