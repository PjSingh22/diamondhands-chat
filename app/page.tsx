"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPaginatedData } from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { filter } from "@chakra-ui/react";


export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [dataFetched, setDataFetched] = useState(false as boolean);
  const [chatData, setChatData] = useState([] as Array<any>);

  // console.log(chatData.then((data) => console.log(data)));
  useEffect(() => {
    if (!dataFetched) {
      // const url = new URL("https://665621609f970b3b36c4625e.mockapi.io/users");
      fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1).then(
        (data) => {
          console.log(data);
          setChatData(data);
          setDataFetched(true);
        }
      );
    }
  }, [dataFetched]);

  const filerUsers = async (term: string) => {
    if (term.length === 0) {
      fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 10, 1).then(
        (data) => {
          setChatData(data);
          return;
        }
      );
    }
    const fetchedUsers = await fetchPaginatedData("https://665621609f970b3b36c4625e.mockapi.io/users", 0, 1).then(data => data);
    const filteredUsers = fetchedUsers.filter((user: any) => user.username.toLowerCase().includes(term.toLowerCase()));

    setChatData(filteredUsers);
  };

  const searchUsers = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`)

    filerUsers(term);
  }



  console.log(chatData);
  if (!dataFetched) {
    return <div className="flex justify-center font-extrabold">Loading...</div>;
  }
  return (
    <main className="max-w-3xl mx-auto md:py-10 h-screen">
      <h1 className="text-4xl font-bold text-primary">Chat Engine</h1>
      <Input
        onChange={(e => searchUsers(e.target.value))}
      />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {chatData?.map((chat) => (
          <div
            key={chat.id}
            className="bg-card p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <Image
                src={chat.avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-primary">
                  {chat.username}
                </h2>
                {chat.active ? (
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
}
