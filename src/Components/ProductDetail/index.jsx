import React from "react";
import { useContext } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import formattedPrice from "../../Utils/index";
import "./styles.css";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);
  console.log("DETALLE DEL PROCUCTO", context.ProductToShowDetail);
  console.log(
    "imagen : ",
    context.ProductToShowDetail?.images?.data[0]?.attributes?.formats?.small
      ?.url
  );
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } flex-col fixed right-1 border bg-white border-black rounded-lg w-[361px] h-[calc(100vh-80px)] bottom-4`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <ArchiveBoxXMarkIcon
            className="h-6 w-6 text-black-500 cursor-pointer"
            onClick={() => context.closeProductDetail()}
          />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-300 h-300 rounded-lg"
          src={
            context.ProductToShowDetail?.images?.data[0]?.attributes?.formats
              ?.small?.url
          }
          alt={context.ProductToShowDetail?.title}
        />
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl">
            ${formattedPrice(context.ProductToShowDetail?.price)}
          </span>
          <span className="font-medium text-md">
            {context.ProductToShowDetail?.title}
          </span>
          <span className="font-ligth text-sm">
            {context.ProductToShowDetail?.description}
          </span>
        </p>
      </figure>
    </aside>
  );
};

export default ProductDetail;
