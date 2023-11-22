import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [userClerkId, setUserClerkId] = useState("");
  const [isAuthStateLoading, setIsAuthStateLoading] = useState(true);
  const router = useRouter();

  const allUsersQuery = api.user.getAllUsers.useQuery();
  const allClerkUsersQuery = api.user.getAllClerkUsers.useQuery();
  const currentUserQuery = api.user.findUserWithClerkId.useQuery(
    userClerkId ?? "",
  );
  const changeApprovalStatusMutation =
    api.user.changeApprovalStatus.useMutation();

  useEffect(() => {
    if (user) {
      setUserClerkId(user.id);
    }
  }, [user]);

  // Clerk will resolve the user asynchronously, so we have to wait
  // and see if the user is authorized. Once userClerkId is resolved
  // useQuery will automatically refetch data with the new input
  useEffect(() => {
    // user is not loaded, we're not sure if they're an admin yet
    if (!isLoaded || !user || userClerkId === "") {
      return;
    }

    // user is explicitly not an admin, not because api call missed
    if (currentUserQuery.data?.isAdmin === false) {
      router.push("/");
    } else if (currentUserQuery.data?.isAdmin === true) {
      // user is explicitly an admin, we're no longer waiting for auth to resolve
      setIsAuthStateLoading(false);
    }
  }, [userClerkId, currentUserQuery, isLoaded, user, router]);

  // we're trying to resolve the auth to determine if user has access to this page
  if (!isLoaded || !user || isAuthStateLoading) return <div>Loading...</div>;

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
