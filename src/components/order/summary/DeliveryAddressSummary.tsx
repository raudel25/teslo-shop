"use client";

import { Country } from "@/interfaces";
import { addressStore } from "@/store";

interface Props {
  countries: Country[];
}

export const DeliveryAddressSummary = ({ countries }: Props) => {
  const { address } = addressStore();
  return (
    <div>
      <h2 className="text-2xl mb-2">Delivery address</h2>

      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city},{" "}
          {countries.find((c) => c.id == address.countryId)?.code}
        </p>
        <p>PC {address.postalCode}</p>
      </div>
    </div>
  );
};
