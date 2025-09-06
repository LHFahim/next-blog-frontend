"use client";

import { useActionState } from "react";
import FormSubmit from "../form-submit/form-submit";

export default function PostForm({
  action,
}: {
  action: (state: unknown, formData: FormData) => Promise<unknown>;
}) {
  const [state, formAction] = useActionState(action, {});

  type FormState = { errors?: string[] };
  const errors = (state as FormState).errors || [];

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>

        <ul className="form-errors">
          {errors!.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </form>
    </>
  );
}
