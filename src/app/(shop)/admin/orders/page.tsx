export const revalidate = 0;

import { getOrders } from "@/actions/order/getOrder";
import { Pagination, Title } from "@/components";
import { OrdersTable } from "@/components/order/table/OrdersTable";
import { isNumber } from "@/utils";

interface Props {
  searchParams: { page?: string };
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;

  const response = await getOrders({ page });
  const orders = response.value?.data ?? [];

  return (
    <>
      <Title title="All Orders" />

      <OrdersTable orders={orders} isAdmin={true} />

      <Pagination totalPages={response.value!.total} />
    </>
  );
}
