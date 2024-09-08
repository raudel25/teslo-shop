import { getCountries } from "@/actions/address/getCountries";
import { getOrder } from "@/actions/order/getOrder";
import { OrderPage } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function AdminOrderPage({ params }: Props) {
  const { id } = params;

  const response = await getOrder(id);
  const { value: countries } = await getCountries();

  if (!response.ok) notFound();

  return (
    <OrderPage
      order={response.value!}
      id={id}
      countries={countries ?? []}
      isAdmin={true}
    />
  );
}
