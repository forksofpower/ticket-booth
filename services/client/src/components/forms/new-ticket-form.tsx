"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { NewTicketFormInput } from "@/hooks/use-tickets";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import Input from "./input";
import Label, { LabelText } from "./label";

export default function NewTicketForm({
  escapeForm,
}: {
  escapeForm: () => void;
}) {
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
        router.push(routes.showTicket(data.id));
      }, 1000);
    }
  }

  return (
    <form
      // method="POST"
      className="space-y-4"
    >
      <div className="form-control">
        <Label className="pb-1" title="Ticket Title" />
        <Input type="text" {...titleField} />
        <Label className="mt-1 min-h-[1rem] py-0">
          <LabelText className="text-error text-xs">
            {errors.title?.message}
          </LabelText>
        </Label>
      </div>
      <div className="form-control">
        <Label className="pb-1" title="Ticket Price" />
        <label className="input-group">
          <span>$</span>
          <Input type="number" {...priceField} />
        </label>
        <Label className="mt-1 min-h-[1rem] py-0">
          <LabelText className="text-error text-xs">
            {errors.price?.message}
          </LabelText>
        </Label>
      </div>
      <div className="form-control">
        <button
          className="btn btn-secondary btn-outline"
          onClick={() => escapeForm()}
        >
          Go to Tickets
        </button>
      </div>
      <div className="form-control">
        <button
          onClick={() => handleSubmit(onSubmit)}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
