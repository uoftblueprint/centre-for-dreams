import { useEffect, useState } from "react";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";

import { api } from "~/utils/api";

export default function adminDashboard() {
  const allUsers = api.user.getAllUsers.useQuery().data;
  const [clerkUsers, setClerkUsers] = useState<User[]>([]);

  async function fetchAllClerkUsers() {
    const allClerkUsers = await clerkClient.users.getUserList();
    setClerkUsers(allClerkUsers);
  }

  useEffect(() => {
    fetchAllClerkUsers();
  }, []);

  return (
    <div>
      {allUsers?.map((user) => (
        <div key={user.id}>
          <p>UserId: {user.id}</p>
          <p>ClerkId: {user.clerkId}</p>
        </div>
      ))}
    </div>
  );
}
