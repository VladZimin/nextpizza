import {prisma} from '@/prisma/prisma-client'
import {notFound} from 'next/navigation'
import {Container, ProductImage, Title, VariantsGroup} from '@/components/shared'

export default async function ProductPage({params}: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id)
    }
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40}/>

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size={'md'} className="font-extrabold mb-1"/>
          <p className="text-grey-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <VariantsGroup
            items={[
              {
                name: 'Маленькая',
                value: '1'
              },
              {
                name: 'Средняя',
                value: '2'
              },
              {
                name: 'Большая',
                value: '3',
                disabled: true
              },
            ]}
            selectedValue={'2'}
          />
        </div>
      </div>
      {/*<ChoosePizzaForm*/}
      {/*  imageUrl={product.imageUrl}*/}
      {/*  name={product.name}*/}
      {/*  items={product.items}*/}
      {/*  ingredients={product.ingredients}*/}
      {/*/>*/}

      {/*<ProductsGroupList*/}
      {/*  className="mt-20"*/}
      {/*  listClassName="grid-cols-4"*/}
      {/*  key={product.category.id}*/}
      {/*  title="Рекомендации"*/}
      {/*  products={product.category.products}*/}
      {/*  categoryId={product.category.id}*/}
      {/*/>*/}
    </Container>
  )
}
