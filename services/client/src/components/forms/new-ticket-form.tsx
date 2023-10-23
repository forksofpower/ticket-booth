"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { useRequest } from "@/hooks/use-request";
import { NewTicketFormInput, Ticket } from "@/hooks/use-tickets";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import Input from "../form-elements/input";
import Label, { LabelText } from "../form-elements/label";

export default function NewTicketForm({ onCancel }: { onCancel: () => void }) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<NewTicketFormInput>>({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<NewTicketFormInput>();

  const { doRequest: createTicket, errors: createTicketErrors } = useRequest<
    NewTicketFormInput,
    Ticket
  >({
    url: "/api/tickets",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  });

  // useEffect(() => {
  //   setErrors(normalizeErrorResponsesByField(createTicketErrors!));
  // }, [createTicketErrors]);

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
    const data = await createTicket(formData);

    if (createTicketErrors) {
      setErrors(normalizeErrorResponsesByField(createTicketErrors));
    } else {
      setTimeout(() => {
        router.push(routes.listTickets());
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          type="button"
          className="btn btn-secondary btn-outline"
          onClick={onCancel}
        >
          Go to Tickets
        </button>
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
