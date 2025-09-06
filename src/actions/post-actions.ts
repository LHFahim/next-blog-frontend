"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (_prevState: unknown, formData: FormData) => {
  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const image = formData.get("image");

  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }
  if (!(image instanceof File) || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image as File);
  } catch {
    throw new Error("Image upload failed");
  }

  await storePost({
    image_url: imageUrl,
    title,
    content,
    user_id: 1,
  });

  revalidatePath("/feed", "layout");
  redirect("/feed");
};

export const togglePostLikeStatus = async (
  postId: string,
  formData: FormData
) => {
  // console.log(formData);
  await updatePostLikeStatus(+postId, 2);
  revalidatePath("/feed", "layout");
};
