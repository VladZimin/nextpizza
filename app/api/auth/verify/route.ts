import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/prisma/prisma-client'

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code')
    if (!code) {
      return NextResponse.json({error: 'invalid code'}, {status: 400})
    }
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code: code
      }
    })
    if (!verificationCode) {
      return NextResponse.json({error: 'invalid code'}, {status: 400})
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId
      },
      data: {
        verified: new Date()
      }
    })

    return NextResponse.redirect(new URL('/?verified', req.url))
  } catch (e) {
    console.log('[VERIFY_GET]', e)
  }
}