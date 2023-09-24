import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { TextField } from "@/components/forms/fields/text-field";
import useTickets, { NewTicketFormInput } from "@/hooks/use-tickets";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import { NextPageWithLayout } from "../_app";

type Props = {};

const NewTicketForm = () => {
  const [errors, setErrors] = useState<FieldErrors<NewTicketFormInput>>({});
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<NewTicketFormInput>();

  const {
    actions: { createTicket },
    errors: { createTicketErrors },
  } = useTickets();

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  useEffect(() => {
    if (createTicketErrors) {
      setErrors(normalizeErrorResponsesByField(createTicketErrors));
    }
  }, [createTicketErrors]);

  const titleField = register("title", {
    required: "Title is required",
  });

  const priceField = register("price", {
    required: "Price is required",
  });

  async function onSubmit({ title, price }: NewTicketFormInput) {
    await createTicket({
      title,
      price,
    });
  }

  return (
    <form className="space-y-4">
      <TextField
        field="title"
        label="Title"
        type="text"
        register={titleField}
        error={errors.title}
      />
      <TextField
        field="price"
        label="Price"
        type="text"
        register={priceField}
        error={errors.price}
      />
      <div className="form-control">
        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </form>
  );
};

const NewTicket: NextPageWithLayout = (props: Props) => {
  return (
    <div>
      <h1>Create A Ticket</h1>
      <NewTicketForm />
    </div>
  );
};

// NewTicket.getInitialProps = async (ctx, client, currentUser) => {
//   return {};
// };

export default NewTicket;
