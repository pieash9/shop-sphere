"use client";

import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/utils/types/product.types";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { getSingleProduct } from "@/utils/api/products";
import { addToCart } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  let product: IProduct | null = null;

  if (params.id) {
    try {
      product = await getSingleProduct(+params.id);
    } catch (error) {
      console.error("Error fetching product:", error);
      return <div>Error fetching product details.</div>;
    }
  }
  if (!product) return <div>Error fetching product details.</div>;

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="md:flex mt-10 container mx-auto w-full gap-5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="flex justify-center items-center md:w-4/12 border rounded p-4"
      >
        <Image
          src={product?.image!}
          alt={product?.title!}
          width={600}
          height={600}
          className="h-72 rounded-md object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
        className="  rounded-md p-4 md:w-8/12"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{product?.title}</h1>
          <p className="text-lg font-bold text-orange-500">
            $ {product?.price.toFixed(2)}
          </p>
          <div className="flex gap-1 items-center text-sm">
            <FaStar className="text-yellow-400" />
            <span>
              {product?.rating?.rate}/5 <span>({product?.rating?.count})</span>
            </span>
          </div>
          <div className=" text-sm ">{product?.description}</div>
        </div>
        <div className="mt-8">
          <Button onClick={() => handleAddToCart(product!)} className="">
            Add to Cart
          </Button>
        </div>
      </motion.div>
      {!product && <div className="text-center">Product not found.</div>}
    </div>
  );
};

export default ProductDetails;
