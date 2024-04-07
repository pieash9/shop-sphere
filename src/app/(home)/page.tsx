import Product from "@/components/product/product";
import { getAllProducts } from "@/utils/api/products";
import { IProduct } from "@/utils/types/product.types";

const HomePage = async () => {
  const products: IProduct[] = await getAllProducts();

  return (
    <main className="container mx-auto px-4">
      <Product products={products} />
    </main>
  );
};

export default HomePage;
