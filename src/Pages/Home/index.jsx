import { useState, useEffect } from "react";

import Layaout from "../../Components/Layaout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { apiUrl, strapiToken } from "../../Api";
function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const HEADERS = new Headers();
        HEADERS.append("Authorization", `Bearer ${strapiToken}`);
        const response = await fetch(`${apiUrl}/products?populate=images`, {
          method: "GET",
          headers: HEADERS,
        });
        const data = await response.json();
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error(`Eror obteniendo productos ${error}`);
      }
    };
    fetchData();
  }, []);
  return (
    <Layaout>
      Home
      <section className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {products?.map((product) => {
          console.log(product);
          return <Card key={product.id} data={product} />;
        })}
      </section>
      <ProductDetail />
    </Layaout>
  );
}

export default Home;
