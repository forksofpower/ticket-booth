"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { TextField } from "@/components/forms/fields/text-field";
import { NewTicketFormInput } from "@/hooks/use-tickets";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

const NewTicketForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<NewTicketFormInput>>({});
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<NewTicketFormInput>();

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  const titleField = register("title", {
    required: "Title is required",
  });

  const priceField = register("price", {
    required: "Price is required",
  });

  async function onSubmit(formData: NewTicketFormInput) {
    console.log(formData);

    const response = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.errors) {
      setErrors(normalizeErrorResponsesByField(data.errors));
    } else {
      setTimeout(() => {
        router.push(routes.tickets.list());
      }, 1000);
    }
  }

  return (
    <form className="space-y-4" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        field="title"
        label="Title"
        register={titleField}
        error={errors.title}
      />
      <TextField
        field="price"
        label="Price"
        register={priceField}
        error={errors.price}
      />
      <div className="form-control">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

const NewTicket = () => {
  return (
    <div>
      <h1>Create A Ticket</h1>
      <NewTicketForm />
    </div>
  );
};
export default NewTicket;
