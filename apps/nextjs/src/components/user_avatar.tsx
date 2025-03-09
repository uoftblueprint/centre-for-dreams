import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src: string | undefined;
  username: string;
  createdAt: Date;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  username,
  createdAt,
}) => {
  return (
    <div className="mb-4 flex items-center justify-center space-x-4 align-middle">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold">{username}</p>
        <p className="mb-2 text-xs text-gray-500">
          Posted: {createdAt.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
