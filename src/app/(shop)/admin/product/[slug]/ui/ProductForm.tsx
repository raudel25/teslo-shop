"use client";

import { useForm } from "react-hook-form";
import { Category, Product } from "@/interfaces";
import clsx from "clsx";
import { Modal, ProductImage, Spinner } from "@/components";
import {
  createOrUpdateProduct,
  deleteProductImage,
} from "@/actions/product/createOrUpdateProduct";
import { useState } from "react";

interface Props {
  product: Partial<Product>;
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ ok: boolean; message: string }>();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      sizes: product.sizes ?? [],

      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("categoryId", productToSave.categoryId);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    setLoading(true);
    const { ok, message } = await createOrUpdateProduct(formData);
    setLoading(false);

    if (!ok) {
      setMessage({ ok: false, message: message! });
      return;
    }

    setValue("images", undefined);
    setMessage({ ok: true, message: "Product successfully updated" });
  };

  return (
    <>
      {loading && <Spinner />}
      {message && (
        <Modal
          isOpen={true}
          type={message.ok ? "success" : "error"}
          onClose={() => setMessage(undefined)}
          message={message.message}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      >
        {/* Textos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Title</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("title", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Slug</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("slug", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Description</span>
            <textarea
              rows={5}
              className="p-2 border rounded-md bg-gray-200"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="flex flex-col mb-2">
            <span>Price</span>
            <input
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              {...register("price", { required: true, min: 0 })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Category</span>
            <select
              className="p-2 border rounded-md bg-gray-200"
              {...register("categoryId", { required: true })}
            >
              <option value="">[Seleccione]</option>
              {categories.map((c, idx) => (
                <option value={c.id} key={idx}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-primary w-full">Save</button>
        </div>

        {/* Selector de tallas y fotos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>In stock</span>
            <input
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              {...register("inStock", { required: true, min: 0 })}
            />
          </div>

          {/* As checkboxes */}
          <div className="flex flex-col">
            <span>Sizes</span>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={clsx(
                    "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                    {
                      "bg-blue-500 text-white":
                        getValues("sizes").includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col mb-2">
              <span>Images</span>
              <input
                type="file"
                {...register("images")}
                multiple
                className="p-2 border rounded-md bg-gray-200"
                accept="image/png, image/jpeg, image/avif"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.images?.map((image) => (
                <div key={image.id}>
                  <ProductImage
                    alt={product.title ?? ""}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md"
                  />

                  <button
                    type="button"
                    onClick={() => deleteProductImage(image.id)}
                    className="btn-danger w-full rounded-b-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
