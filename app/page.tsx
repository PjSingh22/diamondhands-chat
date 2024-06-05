import React from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input"

interface User {
  id: string;
  avatar: string;
  username: string;
  active: boolean;
}

const UsersPage = async (): Promise<React.ReactNode> => {
  const response = await fetch("https://665621609f970b3b36c4625e.mockapi.io/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users: User[] = await response.json();

  return (
    <main className="max-w-3xl mx-auto md:py-10 h-screen">
      <h1 className="text-4xl font-bold text-primary">User Engine</h1>
      <Input />
      <div className="flex justify-center gap-2 mt-2">
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
      <div className="grid grid-cols-1 gap-4 mt-4">
        {users?.map((user: User) => (
          <div
            key={user.id}
            className="bg-card p-4 rounded-lg flex items-center justify-between"
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
    </main>
  );
};

export default UsersPage;

























// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { fetchPaginatedData } from "@/lib/utils";
// import { Input } from "@/components/ui/input"
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();
//   const [dataFetched, setDataFetched] = useState(false as boolean);
//   const [userData, setuserData] = useState([] as Array<any>);
//   const [currpage, setCurrPage] = useState(1 as number);

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams);
//     const input = params.set("page", "1");
//     replace(`${pathname}?${params.toString()}`);

//     if (!dataFetched) {
//       fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1).then(
//         (data) => {
//           setuserData(data);
//           setDataFetched(true);
//         }
//       );
//     }
//   }, [dataFetched]);

//   // search with url params
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams);
//     const input = params.get("search")

//     if (input) {
//       fitlerUsers(input);
//     }

//   }, []);

//   const setPage = (page: string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", page);
//     replace(`${pathname}?${params.toString()}`);
//   }

//   const fetchNextPage = async () => {
//     const nextPage = currpage + 1;
//     const data = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, nextPage).then(data => data);

//     if (data.length === 0) return;

//     setPage(nextPage.toString());

//     setuserData(data);
//     setCurrPage(nextPage);
//   }

//   const fetchPrevPage = async () => {
//     if (currpage === 1) {
//       return;
//     };

//     const prevPage = currpage - 1;
//     const data = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, prevPage).then(data => data);
//     setPage(prevPage.toString());
//     setuserData(data);
//     setCurrPage(prevPage);
//   }

//   const fitlerUsers = async (term: string) => {
//     if (term.length === 0) {
//       fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1).then(
//         (data) => {
//           setuserData(data);
//           return;
//         }
//       );
//     }
//     const fetchedUsers = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 0, 1).then(data => data);
//     const filteredUsers = fetchedUsers.filter((user: any) => user.username.toLowerCase().includes(term.toLowerCase()));

//     setuserData(filteredUsers);
//   };

//   const searchUsers = (term: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (term) {
//       params.set("search", term);
//     } else {
//       params.delete("search");
//     }

//     replace(`${pathname}?${params.toString()}`)

//     fitlerUsers(term);
//   }

//   if (!dataFetched) {
//     return <div className="flex justify-center font-extrabold">Loading...</div>;
//   }

//   return (
//     <main className="max-w-3xl mx-auto md:py-10 h-screen">
//       <h1 className="text-4xl font-bold text-primary">user Engine</h1>
//       <Input
//         onChange={(e => searchUsers(e.target.value))}
//       />
//       <div className="flex justify-center gap-2 mt-2">
//         <button
//           className="border-2 bg-white text-black p-1"
//           onClick={fetchPrevPage}
//         >
//           Back
//         </button>
//         <span className="text-white p-1 font-extrabold">{currpage}</span>
//         <button
//           className="border-2 bg-white text-black p-1"
//           onClick={fetchNextPage}
//         >
//           Next
//         </button>
//       </div>
//       <div className="grid grid-cols-1 gap-4 mt-4">
//         {userData?.map((user) => (
//           <div
//             key={user.id}
//             className="bg-card p-4 rounded-lg flex items-center justify-between"
//           >
//             <div className="flex items-center">
//               <Image
//                 src={user.avatar}
//                 alt="avatar"
//                 width={50}
//                 height={50}
//                 className="rounded-full"
//               />
//               <div className="ml-4">
//                 <h2 className="text-lg font-semibold text-primary">
//                   {user.username}
//                 </h2>
//                 {user.active ? (
//                   <span className="text-sm text-accent text-white">🟢 Active</span>
//                 ) : (
//                   <span className="text-sm text-muted text-white">🔴 Offline</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
