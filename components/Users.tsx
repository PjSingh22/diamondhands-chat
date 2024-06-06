import React from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { fetchPaginatedData } from "@/lib/utils";

interface User {
  id: string;
  avatar: string;
  username: string;
  active: boolean;
}

export default async function Users() {
  const response = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1);
  const users: User[] = await response.json();

  return (
    <section id='users' className='border border-white p-3'>
      <Input />
      <div className="flex justify-center gap-2 mt-2 mb-2">
        <button
          className="border-2 bg-white text-black p-1"
          // onClick={fetchPrevPage}
        >
          Back
        </button>
        {/* <span className="text-white p-1 font-extrabold">{currpage}</span> */}
        <button
          className="border-2 bg-white text-black p-1"
          // onClick={fetchNextPage}
        >
          Next
        </button>
      </div>
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
