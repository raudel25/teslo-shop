import { getCountries } from "@/actions/address/getCountries";
import { getOrder } from "@/actions/order/getOrder";
import { auth } from "@/auth.config";
import { OrderPage } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function OrderUserPage({ params }: Props) {
  const { id } = params;

  const session = await auth();

  const response = await getOrder(id);
  const { value: countries } = await getCountries();

  if (!response.ok) notFound();
  if (response.value!.userId !== session?.user.id) notFound();

  return (
    <OrderPage
      order={response.value!}
      id={id}
      countries={countries ?? []}
      isAdmin={false}
    />
  );
}
