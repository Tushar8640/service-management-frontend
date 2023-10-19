import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useAddProductMutation } from "@/redux/features/products/productApi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const AddServiceForm = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [addProduct, { data, isError, isSuccess }] = useAddProductMutation();
  // Initialize state to hold form input values
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    sku: "",
    size: "",
    category: "",
    subCategory: "",
    color: "",
    status: "",
    description: "",
    rating: [],
    image: "",
    dimension: "",
    version: [],
    addedBy: user.id,
  });
  //setting form data to add product
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addProduct(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Product Added successfully!`, "success");
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
  const subCategoryArray2 = ["Saree", "Kurti", "Pants", "Shoes"];
  const subCategoryArray3 = ["Watch", "HandBag", "Wallet", "Bags"];
  const subCategoryArray4 = ["Earrings", "Necklace", "Bangles"];
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory(value);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">
        Add Service
      </h1>
      <form onSubmit={handleSubmit} className="px-6 py-8 bg-gray-200 rounded">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
              value={formData.price}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="sku">SKU</label>
            <Input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>

          <div>
            <label htmlFor="size">Size</label>
            <Input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              className="rounded my-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategory}
              required
              className="rounded w-full py-2 px-2"
            >
              <option value="">Select Category</option>
              {categoryArray?.map((s: string, i: number) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="subCategory">Sub-Category</label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              required
              className="rounded w-full py-2 px-2"
            >
              <option value="">Select SubCategory</option>
              {category === "Men" &&
                subCategoryArray1?.map((s: string, i: number) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              {category === "Women" &&
                subCategoryArray2?.map((s: string, i: number) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              {category === "All Wallets & Small Leather Goods" &&
                subCategoryArray3?.map((s: string, i: number) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              {category === "Jewelry" &&
                subCategoryArray4?.map((s: string, i: number) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          {" "}
          <div>
            <label htmlFor="color">Color</label>
            <Input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
              className="rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
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
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="rating">Rating</label>
          <Input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="rounded"
          />
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <Input
            type="text"
            id="image"
            name="image"
            value={formData.image}
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
            value={formData.dimension}
            onChange={handleInputChange}
            className="rounded"
          />
        </div>

        <div>
          <label htmlFor="version">Version</label>
          <Input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            className="rounded"
          />
        </div>

        <Button className="mt-2" type="submit">
          Add Service
        </Button>
      </form>
    </div>
  );
};
export default AddServiceForm;
