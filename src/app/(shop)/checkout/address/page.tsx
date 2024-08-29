import { getCountries } from "@/actions/address/getCountries";
import { AddressForm } from "./ui/AddressForm";

import { auth } from "@/auth.config";
import { Title } from "@/components";
import { getAddress } from "@/actions/address/getAddress";

export default async function AddressPage() {
  const { value: countries } = await getCountries();

  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const userAddress = (await getAddress(session.user.id)).value;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subTitle="Delivery address" />

        <AddressForm countries={countries!} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
