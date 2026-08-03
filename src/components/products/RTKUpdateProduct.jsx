import React from 'react'
import { useUpdateProductByUuidMutation } from '../API/ecommerceApi'
import UpdateProduct from '../../pages/UpdateProduct';

export default function RTKUpdateProduct() {
    const [updateProductRequest,{data:updateProductResponse}] = useUpdateProductByUuidMutation();
    const newProduct = {
      name: "Vintage pillar curtain",
      description:
        "Premium minimalist t-shirt perfect for summer vibes. Comfortable, breathable fabric with bold cultural design elements.",
      stockQuantity: 120,
      priceIn: 8,
      priceOut: 24.99,
      discount: 15,
      color: [
        {
          color: "Classic Black",
          images: [
            "https://assets.example.com/horizon-tee-black-front.jpg",
            "https://assets.example.com/horizon-tee-black-back.jpg",
          ],
        },
        {
          color: "Pearl White",
          images: [
            "https://assets.example.com/horizon-tee-white-front.jpg",
            "https://assets.example.com/horizon-tee-white-back.jpg",
          ],
        },
        {
          color: "Ocean Blue",
          images: [
            "https://assets.example.com/horizon-tee-blue-front.jpg",
            "https://assets.example.com/horizon-tee-blue-back.jpg",
          ],
        },
      ],
      thumbnail:
        "https://i.pinimg.com/736x/23/cd/28/23cd280e6152c42dca9ff9cca7753c62.jpg",
      warranty: "Lifetime Quality Guarantee",
      availability: true,
      images: [
        "https://assets.example.com/horizon-tee-1.jpg",
        "https://assets.example.com/horizon-tee-2.jpg",
        "https://assets.example.com/horizon-tee-3.jpg",
        "https://assets.example.com/horizon-tee-lifestyle.jpg",
      ],
      categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
      supplierUuid: "7dd85516-733b-4d47-a445-583c225fb833",
      brandUuid: "c273f461-4492-4f00-9d69-8e12d0dd9d8b",
    };
    async function UpdateProductFunc() {
      updateProductRequest({
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        updateProduct: newProduct,
        uuid: "6961392e-c8f2-417b-862b-5321814a15666",
      });
    }
  return (
    <div>
      <div className="bg-white border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Update product</h3>
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
            onClick={()=> UpdateProductFunc()}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
