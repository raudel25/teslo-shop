"use client";

import { useForm } from "react-hook-form";
import { Category } from "@/interfaces";
import { Modal, Spinner } from "@/components";
import { useState } from "react";
import { createOrUpdateCategory } from "@/actions/category/createOrUpdateCategory";
import { useRouter } from "next/navigation";

interface Props {
  category: Partial<Category>;
}

interface FormInputs {
  isMain: boolean;
  slug: string;
  label: string;
  title: string;
  subTitle: string | null;
}

export const CategoryForm = ({ category }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    ok: boolean;
    message: string;
    action?: () => void;
  }>();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...category,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    if (category.id) formData.append("id", category.id);

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("label", data.label);
    formData.append("isMain", data.isMain.toString());

    if (data.subTitle) formData.append("subTitle", data.subTitle);
    setLoading(true);
    const { ok, message, value } = await createOrUpdateCategory(formData);
    setLoading(false);
    if (!ok) {
      setMessage({ ok: false, message: message! });
      return;
    }
    setMessage({
      ok: true,
      message: "Category successfully updated",
      action: () => router.replace(`/admin/category/${value?.slug}`),
    });
  };

  return (
    <>
      {loading && <Spinner />}
      {message && (
        <Modal
          isOpen={true}
          type={message.ok ? "success" : "error"}
          onClose={() => {
            setMessage(undefined);
            if (message.action) message.action();
          }}
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
            <span>Subtitle</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("subTitle")}
            />
          </div>

          <div className="flex mb-2">
            <span>Main</span>
            <input
              type="checkbox"
              className="ml-2 rounded-md w-4"
              {...register("isMain")}
            />
          </div>

          <button className="btn-primary w-full">Save</button>
        </div>

        {/* Selector de tallas y fotos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Slug</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("slug", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Label</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("label", { required: true })}
            />
          </div>
        </div>
      </form>
    </>
  );
};
