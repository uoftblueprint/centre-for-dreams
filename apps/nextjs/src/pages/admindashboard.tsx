import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const allUsersQuery = api.user.getAllUsers.useQuery();
  const allClerkUsersQuery = api.user.getAllClerkUsers.useQuery();

  const changeApprovalStatusMutation =
    api.user.changeApprovalStatus.useMutation();

  useEffect(() => {
    // user is not loaded, we're not sure if they're an admin yet
    if (!isLoaded || !user) {
      return;
    }

    if (user.publicMetadata.isAdmin !== true) {
      router.push("/");
    }
  }, [user, isLoaded, router]);

  // we're trying to resolve the auth to determine if user has access to this page
  if (!isLoaded || !user) return <div>Loading...</div>;

  return (
    <div>
      {allUsersQuery.data?.map((user) => (
        <div key={user.id} className="m-4">
          <p>UserId: {user.id}</p>
          <p>ClerkId: {user.clerkId}</p>
          <p>
            First Name: {allClerkUsersQuery.data?.get(user.clerkId)?.firstName}
          </p>
          <button
            onClick={() =>
              changeApprovalStatusMutation.mutate({
                id: user.id,
                isApproved: true,
              })
            }
          >
            Approve
          </button>
          <button
            onClick={() =>
              changeApprovalStatusMutation.mutate({
                id: user.id,
                isApproved: false,
              })
            }
          >
            Unapprove
          </button>
        </div>
      ))}
    </div>
  );
}
