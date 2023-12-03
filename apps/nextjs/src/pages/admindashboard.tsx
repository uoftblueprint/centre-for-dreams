import { api } from "~/utils/api";

export default function AdminDashboard() {
  const allUsersQuery = api.user.getAllUsers.useQuery();
  const allClerkUsersQuery = api.user.getAllClerkUsers.useQuery();

  const changeApprovalStatusMutation =
    api.user.changeApprovalStatus.useMutation();

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
                clerkId: user.clerkId,
                isApproved: true,
              })
            }
          >
            Approve
          </button>
          <button
            onClick={() =>
              changeApprovalStatusMutation.mutate({
                clerkId: user.clerkId,
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
