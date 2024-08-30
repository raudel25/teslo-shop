import { Address, Country } from "@/interfaces";

interface Props {
  countries: Country[];
  address:Address
}

export const DeliveryAddressSummary = ({ countries, address }: Props) => {
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
