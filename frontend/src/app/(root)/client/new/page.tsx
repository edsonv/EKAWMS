"use client";
import { createClient } from "@/actions/client/createClient";
import { IClient, IVehicle } from "@/types";
import { ChangeEvent, useState } from "react";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  docId: "",
  plate: "",
  make: "",
  model: "",
  year: "",
};
const CreateNewClient = () => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = () => {
    const client = (): Omit<IClient, "vehicles"> => {
      const { fullName, phone, email, docId } = values;

      return { fullName, phone, email, docId };
    };
    const vehicle = (): Omit<IVehicle, "clientId" | "notes"> => {
      const { plate, make, model, year } = values;
      return { plate, make, model, year };
    };
    createClient(client(), vehicle()).then((r) => {
      if (r.ok) {
        setValues(initialState);
      }
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.trim() });
    return;
  };

  return (
    <>
      <form action={handleSubmit}>
        <fieldset>
          <legend>Información del cliente</legend>
          <label htmlFor="fullName">
            Nombre completo
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={handleInputChange}
              value={values.fullName}
            />
          </label>

          <label htmlFor="phone">
            Teléfono
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handleInputChange}
              value={values.phone}
            />
          </label>

          <label htmlFor="email">
            Correo electrónico
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              value={values.email}
            />
          </label>

          <label htmlFor="docId">
            Número de identificación
            <input
              type="number"
              name="docId"
              id="docId"
              onChange={handleInputChange}
              value={values.docId}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Información del vehículo</legend>
          <label htmlFor="plate">
            Placa
            <input
              type="text"
              name="plate"
              id="plate"
              onChange={(e) => {
                const toUpper = e.target.value.toUpperCase();
                e.target.value = toUpper;
                return handleInputChange(e);
              }}
              value={values.plate}
            />
          </label>

          <label htmlFor="make">
            Fabricante
            <input
              type="text"
              name="make"
              id="make"
              onChange={handleInputChange}
              value={values.make}
            />
          </label>

          <label htmlFor="model">
            Modelo
            <input
              type="text"
              name="model"
              id="model"
              onChange={handleInputChange}
              value={values.model}
            />
          </label>

          <label htmlFor="year">
            Año
            <input
              type="number"
              name="year"
              id="year"
              onChange={handleInputChange}
              value={values.year}
            />
          </label>
        </fieldset>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default CreateNewClient;
