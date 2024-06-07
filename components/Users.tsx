import React from 'react';
import Image from 'next/image';
// import { Input } from "@/components/ui/input"
import { fetchUsers } from "@/lib/utils";
import PaginationControls  from "@/components/PaginationControls";
import Link from 'next/link';

interface User {
  id: string;
  avatar: string;
  username: string;
  active: boolean;
}

type UsersProps = {
  page: string;
  searchQuery: string;
};

export default async function Users({ page, searchQuery } : UsersProps) {
  const currPage = parseInt(page) || 1;
  const searchParam = searchQuery || '';
  // const response = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1);
  const users: User[] = await fetchUsers(currPage, searchParam);

  return (
    <section id='users' className='border border-white p-3'>
      {/* <Input placeholder={"Search..."} /> */}
      <PaginationControls />
      <div className="flex flex-col">
        {users?.map((user: User) => (
          <div
            key={user.id}
            className="bg-card p-2 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <Image
                src={user.avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-primary">
                  {user.username}
                </h2>
                {user.active ? (
                  <span className="text-sm text-accent text-white">🟢 Active</span>
                ) : (
                  <span className="text-sm text-muted text-white">🔴 Offline</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
