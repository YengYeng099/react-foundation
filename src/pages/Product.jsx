import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductDetailComponent from "../components/products/ProductDetailComponent";
import { useGetSingleProductsQuery } from "../components/API/ecommerceApi";

export default function Product() { 

  const { uuid } = useParams();
  console.log(`==> uuid: ${uuid}`)
  const {data} = useGetSingleProductsQuery(uuid);

  // const { name, description, thumbnail, priceOut } = data
  return (
    <ProductDetailComponent
      uuid = {data?.uuid}
      title={data?.name}
      description={data?.description}
      thumbnail={data?.thumbnail}
      price={data?.priceOut}
    />
  );
}
