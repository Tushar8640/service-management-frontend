import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateProductMutation } from "@/redux/features/products/productApi";
import Swal from "sweetalert2";
import { IServiceProps } from "@/interfaces/service";
import { useRouter } from "next/router";

const EditProductForm = ({ product }: IServiceProps) => {
  const [updateProduct, { data, isError, isSuccess }] =
    useUpdateProductMutation();
  // Initialize state to hold form input values
  const [category, setCategory] = useState(product?.category);
  const [formData, setFormData] = useState({
    title: product?.title,
    price: product?.price,
    category: product?.category,
    status: product?.status,
    description: product?.description,
    images: product?.images,
  });
  //setting form data for edit
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProduct({ id: product?._id, data: formData });
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Product Updated successfully!`, "success");
      router.push("/dashboard/manage");
    }
  }, [isSuccess, isError, data, router]);
  //handling category and corresponding subcategory
  const categoryArray = [
    "Men",
    "Women",
    "All Wallets & Small Leather Goods",
    "Jewelry",
  ];
  const subCategoryArray1 = ["T-shirt", "Polos", "Pants", "Shoes"];
  const subCategoryArray2 = ["Sharee", "Kurti", "Pants", "Shoes"];
  const subCategoryArray3 = ["Watch", "HandBag", "Wallet", "Bags"];
  const subCategoryArray4 = ["Earrings", "Necklace", "Bangles"];
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory(value);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif ">
        Update Service
      </h1>
      <form onSubmit={handleSubmit} className="px-6 py-8 bg-gray-200 rounded">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={product?.title}
            onChange={handleInputChange}
            required
            className="rounded my-2"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="price">Price</label>
            <Input
              type="number"
              id="price"
              name="price"
              defaultValue={product?.price}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2"></div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              defaultValue={product?.category}
              onChange={handleCategory}
              required
              className="rounded w-full py-2 px-2"
            >
              <option value={product?.category}>{product?.category}</option>
              {categoryArray?.map((s: string, i: number) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              defaultValue={product?.status}
              onChange={handleInputChange}
              required
              className="rounded w-full py-2 px-2"
            >
              <option value="">Select Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows={4}
            className="w-full rounded"
            id="description"
            name="description"
            defaultValue={product?.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <Input
            type="text"
            id="image"
            name="image"
            defaultValue={product?.images}
            onChange={handleInputChange}
            className="rounded"
          />
        </div>

        <div>
          <label htmlFor="dimension">Dimension</label>
          <Input
            type="text"
            id="dimension"
            name="dimension"
            defaultValue={product?.duration}
            onChange={handleInputChange}
            className="rounded"
          />
        </div>

        <Button className="mt-2" type="submit">
          Edit Product
        </Button>
      </form>
    </div>
  );
};
export default EditProductForm;
