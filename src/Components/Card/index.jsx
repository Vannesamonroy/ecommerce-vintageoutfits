import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon } from "@heroicons/react/24/solid";
import formattedPrice from "../../Utils/index";
const Card = ({ data }) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShowDetail(productDetail);
  };
  console.log("data en la card", data);
  return (
    <div
      className="bg-white cursor-pointer w-56 h-60"
      onClick={() => showProduct(data?.attributes)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/70 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data?.attributes?.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={
            data?.attributes?.images?.data[0]?.attributes?.formats?.small?.url
          }
          alt={data?.attributes?.title}
        />
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={() =>
            context.setShoppingCartCount(context.shoppingCartCount + 1)
          }
        >
          <PlusIcon className="h-4 w-4 text-black" />
        </div>
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{data?.attributes?.title}</span>
        <span className="text-lg font-medium">
          ${formattedPrice(data?.attributes?.price)}
        </span>
      </p>
    </div>
  );
};

export default Card;
