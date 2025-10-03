"use client";
import { CREATE_CLIENT_AND_VEHICLE } from "@/actions/client/CREATE_CLIENT_AND_VEHICLE";
import { InlineInput, TInlineInput } from "@/components/InlineInput";
import { IClient, IVehicle } from "@/types";
import { useMutation } from "@apollo/client/react";
import { ChangeEvent, useState } from "react";

type TNewClientForm = {
  fullName: string;
  phone: string;
  email: string;
  docId: string;
  plate: string;
  make: string;
  model: string;
  year: string;
};

interface TFormField {
  name: keyof TNewClientForm;
  label: string;
  type: string;
}

const initialState: TNewClientForm = {
  fullName: "",
  phone: "",
  email: "",
  docId: "",
  plate: "",
  make: "",
  model: "",
  year: "",
};

export const NewClientForm = () => {
  const [createClientAndVehicle, { data }] = useMutation(
    CREATE_CLIENT_AND_VEHICLE
  );
  const [values, setValues] = useState<TNewClientForm>(initialState);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name as keyof TNewClientForm]: value });
  }

  function handleReset() {
    setValues(initialState);
  }

  const handleSubmit = async () => {
    const client = (): Omit<IClient, "vehicles"> => {
      const { fullName, phone, email, docId } = values;

      return { fullName, phone, email, docId };
    };
    const vehicle = (): Omit<IVehicle, "clientId" | "notes"> => {
      const { plate, make, model, year } = values;
      return { plate, make, model, year: Number(year) };
    };
    await createClientAndVehicle({
      variables: { client: client(), vehicle: vehicle() },
    });
    if (data) {
      alert("Cliente y vehículo creados con éxito");
      handleReset();
    }
  };

  const clientFields: TFormField[] = [
    {
      name: "fullName",
      label: "Nombre",
      type: "text",
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "tel",
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
    },
    {
      name: "docId",
      label: "N° de identificación",
      type: "number",
    },
  ];
  const vehicleFields: TFormField[] = [
    {
      name: "plate",
      label: "Placas",
      type: "text",
    },
    {
      name: "make",
      label: "Fabricante",
      type: "text",
    },
    {
      name: "model",
      label: "Modelo",
      type: "text",
    },
    {
      name: "year",
      label: "Año",
      type: "number",
    },
  ];

  function createFields(fields: TFormField[]) {
    return fields.map(({ label, ...props }: TInlineInput) => (
      <InlineInput
        key={props.name}
        label={label}
        {...props}
        value={values[props.name as keyof TNewClientForm]}
        onChange={handleInputChange}
      />
    ));
  }

  return (
    <>
      <form
        action={handleSubmit}
        onReset={handleReset}
        className="flex flex-col justify-center items-center gap-8"
      >
        <fieldset className="flex flex-col">
          <legend>Información del cliente</legend>
          {createFields(clientFields)}
        </fieldset>

        <fieldset className="flex flex-col">
          <legend>Información del vehículo</legend>
          {createFields(vehicleFields)}
        </fieldset>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded"
        >
          Crear cliente
        </button>
        <button
          type="reset"
          className="bg-red-600 text-white py-3 px-6 rounded"
        >
          Limpiar
        </button>
      </form>
    </>
  );
};
