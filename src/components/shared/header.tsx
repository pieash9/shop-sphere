"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";
import { IProduct } from "@/utils/types/product.types";
import Image from "next/image";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [cartTotalItem, setCartTotalItem] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartTotalItem: number = cart.reduce(
        (sum, current) => sum + (current.quantity ?? 0),
        0
      );
      setCartTotalItem(cartTotalItem);

      const total = cart.reduce(
        (total, item) => total + item.price * item.quantity! ?? 0,
        0
      );
      setTotal(total);
    }
  }, [cart]);

  const handleIncreaseQuantity = (item: IProduct) => {
    dispatch(addToCart(item));
  };
  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleDeleteItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="py-4 bg-slate-200">
      <nav className="md:flex justify-between items-center container mx-auto hidden flex-col gap-6 text-lg font-medium md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/">
          <h2 className="text-xl font-semibold">Shop Sphere</h2>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/dashboard">
            <div>Dashboard</div>
          </Link>
          <Link href="/login">
            <div>login</div>
          </Link>
          <Link href="/signup">
            <div>Sign up</div>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="relative mr-4 md:mr-0"
          >
            <FaCartPlus size={22} />
            <p className="absolute font-medium -top-3 -right-4 z-10 bg-sky-500/70 text-sm rounded-full px-1.5">
              {cartTotalItem}
            </p>
          </button>
        </div>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/">
              <h2 className="text-xl font-semibold">Shop Sphere</h2>
            </Link>
            <Link href="/dashboard">
              <div>Dashboard</div>
            </Link>
            <Link href="/login">
              <div>login</div>
            </Link>
            <Link href="/signup">
              <div>Sign up</div>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative mr-4 md:mr-0"
            >
              <FaCartPlus size={22} />
              <p className="absolute font-medium -top-3 left-5 z-10 bg-sky-500/70 text-sm rounded-full px-1.5">
                {cartTotalItem}
              </p>
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cart Item">
        <div className="mt-2 grid grid-cols-1 gap-5">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="group transition-all p-3 shadow-md duration-300"
              >
                <div className="flex items-center gap-5 ">
                  <div className="flex justify-center items-center w-20">
                    <Image
                      className="object-contain"
                      src={item.image}
                      alt={item?.title}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="grow">
                    <h3
                      className="mb-2 font-medium line-clamp-1"
                      title={item?.title}
                    >
                      {item?.title}
                    </h3>
                    <div className="flex justify-between">
                      <div className="">
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="button-secondary btn-xs rounded-sm px-3 mr-2"
                        >
                          +
                        </button>
                        {item?.quantity}
                        <button
                          disabled={item?.quantity === 1}
                          onClick={() => handleDecreaseQuantity(item?.id)}
                          className="button-secondary btn-xs rounded-sm px-3 ml-2"
                        >
                          -
                        </button>
                      </div>
                      <p>x</p>$ {item?.price}
                    </div>
                  </div>

                  <motion.button
                    initial={{ x: "100", opacity: 0.7 }}
                    whileHover={{ x: "0", opacity: 1 }}
                    transition={{ duration: 1 }}
                    onClick={() => handleDeleteItem(item.id)}
                    className="cursor-pointer text-opacity-0 group-hover:text-opacity-100 text-red-500 text-3xl font-medium   duration-700"
                    title="remove"
                  >
                    x
                  </motion.button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-10">No item in the cart</div>
          )}
        </div>

        <div className="flex justify-between mt-10">
          <p className="text-lg text-gray-700 font-medium">SubTotal</p>
          <p className="text-xl font-semibold text-gray-700">
            $ {total.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 text-center flex flex-col gap-3">
          <Link href="#">
            <Button
              onClick={() => setIsOpen(true)}
              type="button"
              className="w-full"
            >
              Checkout
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
