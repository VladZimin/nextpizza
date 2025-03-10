import {Container, Filters, ProductGroupList, Title, TopBar,} from '../../shared/components/shared'
import {prisma} from '@/prisma/prisma-client'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variations: true,
        }
      }
    }
  })

  return (
    <>
      <Container className={"mt-10"}>
        <Title text={"Все пиццы"} size={"lg"} className={"font-extrabold"} />
      </Container>
      <TopBar categories={categories.filter(category => Boolean(category.products.length))} />
      <Container className={"mt-10 pb-14"}>
        <div className={"flex gap-[80px]"}>
          <div className={"w-[250px]"}>
            <Filters />
          </div>
          <div className={"flex-1"}>
            <div className={"flex flex-col gap-16"}>
              {
                categories.map((category) => (
                  category.products.length && <ProductGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    products={category.products}
                  />
                ))
              }

            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
