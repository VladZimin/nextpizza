import {NextResponse} from 'next/server'
import {prisma} from '@/prisma/prisma-client'
import {getUserSession} from '@/shared/lib/getUserSession'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json({message: 'Вы не авторизованы'}, {status: 401})
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true
      }
    })

    return NextResponse.json(data)
  } catch (e) {
    console.log('[ME_GET]', e)
  }
}