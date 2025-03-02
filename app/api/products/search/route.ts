import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/prisma/prisma-client'

export async function GET(req: NextRequest) {
  const searchQuery = req.nextUrl.searchParams.get('query') ?? ''
  const searchProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    take: 5
  })
  return NextResponse.json(searchProducts)
}