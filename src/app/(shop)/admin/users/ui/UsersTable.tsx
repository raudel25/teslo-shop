"use client";

import { changeUserRole } from "@/actions/users/updateUser";
import { Modal, Spinner } from "@/components";
import type { User } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ ok: boolean; message: string }>();
  const { data } = useSession();

  const handleChange = async (user: User, value: string) => {
    setLoading(true);
    const response = await changeUserRole(data!.user.id, user.id, value);
    setLoading(false);

    if (!response.ok) setMessage({ ok: false, message: response.message! });
  };

  return (
    <>
      {loading && <Spinner />}
      {message && (
        <Modal
          isOpen={true}
          type={message.ok ? "success" : "error"}
          message={message.message}
          onClose={() => setMessage(undefined)}
        />
      )}
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Nombre completo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  value={user.role}
                  onChange={(e) => handleChange(user, e.target.value)}
                  className="text-sm w-full p-2 text-gray-900"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
