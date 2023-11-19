import { api } from "~/utils/api";

export default function AdminDashboard() {
  const allUsers = api.user.getAllUsers.useQuery().data;
  const allClerkUsers = api.user.getAllClerkUsers.useQuery().data;
  const changeApprovalStatus = api.user.changeApprovalStatus.useMutation();
  return (
    <div>
      {allUsers?.map((user) => (
        <div key={user.id} className="m-4">
          <p>UserId: {user.id}</p>
          <p>ClerkId: {user.clerkId}</p>
          <p>First Name: {allClerkUsers?.get(user.clerkId)?.firstName}</p>
          <button
            onClick={() =>
              changeApprovalStatus.mutate({ id: user.id, isApproved: true })
            }
          >
            Approve
          </button>
          <button
            onClick={() =>
              changeApprovalStatus.mutate({ id: user.id, isApproved: false })
            }
          >
            Unapprove
          </button>
        </div>
      ))}
    </div>
  );
}
