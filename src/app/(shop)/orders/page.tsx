export const revalidate = 0;

import { getOrdersByUser } from "@/actions/order/getOrder";
import { auth } from "@/auth.config";
import { Pagination, Title } from "@/components";
import { OrdersTable } from "@/components/order/table/OrdersTable";
import { isNumber } from "@/utils";

interface Props {
  searchParams: { page?: string };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;
  const session = await auth();

  const response = await getOrdersByUser({ page }, session!.user.id);
  const orders = response.value?.data ?? [];

  return (
    <>
      <Title title="Orders" />

      <OrdersTable orders={orders} isAdmin={false} />

      <Pagination totalPages={response.value!.total} />
    </>
  );
}
