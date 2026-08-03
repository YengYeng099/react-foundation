import React from 'react'
import { useAddNewProductMutation } from '../API/ecommerceApi'

export default function RTKCreateProduct() {
    // const Create Porduct
    const[createProductRequest, {data}] = useAddNewProductMutation();
    const newProduct = {
      name: "Chheng Macbook air m4",
      description:
        "Ultra-thin and lightweight MacBook Air M4 with exceptional performance for everyday computing, content creation, and professional work.",
      computerSpec: {
        processor: "Apple M4 (8-core CPU)",
        ram: "16GB Unified Memory",
        storage: "512GB SSD",
        gpu: "10-core GPU",
        os: "macOS Sonoma",
        screenSize: "13.6 inch Liquid Retina",
        battery: "52.6Wh (up to 18 hours)",
      },
      stockQuantity: 32,
      priceIn: 899,
      priceOut: 1199.0,
      discount: 15.0,
      color: [
        {
          color: "Midnight",
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVyy-0GgSagjvbe8w2WaD2N-HaIJmsA1Rc3LIA9NFuA&s=10",
            "https://cdn.example.com/products/chheng-macbook-m4/midnight-2.jpg",
          ],
        },
        {
          color: "Silver",
          images: [
            "https://cdn.example.com/products/chheng-macbook-m4/silver-1.jpg",
            "https://cdn.example.com/products/chheng-macbook-m4/silver-2.jpg",
          ],
        },
        {
          color: "Space Gray",
          images: [
            "https://cdn.example.com/products/chheng-macbook-m4/gray-1.jpg",
            "https://cdn.example.com/products/chheng-macbook-m4/gray-2.jpg",
          ],
        },
      ],
      thumbnail:
        "https://i.pinimg.com/originals/b3/e4/5f/b3e45f7fe1fb748d8f38cfa39175d6b2.gif",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVyy-0GgSagjvbe8w2WaD2N-HaIJmsA1Rc3LIA9NFuA&s=10",
        "https://cdn.example.com/products/chheng-macbook-m4/side.jpg",
        "https://cdn.example.com/products/chheng-macbook-m4/open.jpg",
      ],
      warranty: "1 Year AppleCare+ Coverage",
      availability: true,
      categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
      supplierUuid: "7dd85516-733b-4d47-a445-583c225fb833",
      brandUuid: "c273f461-4492-4f00-9d69-8e12d0dd9d8b",
    };
    async function createProductFunc() {
        createProductRequest({
            accessToken: import.meta.env.VITE_ACCESS_TOKEN,
            createProduct : newProduct
        })
    }
  return (
    <div>
      <div className="bg-white border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Create product</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <form action="#">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="product-name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product-name"
                  id="product-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple Imac 27”"
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Electronics"
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple"
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="$2300"
                  required=""
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="product-details"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Details
                </label>
                <textarea
                  id="product-details"
                  rows={6}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                  defaultValue={""}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
            onClick={() => createProductFunc()}
          >
            Save all
          </button>
        </div>
      </div>
    </div>
  );
}
