export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from "@/components";

import { UsersTable } from "./ui/UsersTable";
import { isNumber } from "@/utils";
import { getPaginatedUsers } from "@/actions/users/getUser";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;

  const response = await getPaginatedUsers({ page });

  return (
    <>
      <Title title="Users maintenance" />

      <div className="mb-10">
        <UsersTable users={response.value?.data ?? []} />

        <Pagination totalPages={response.value?.total!} />
      </div>
    </>
  );
}
