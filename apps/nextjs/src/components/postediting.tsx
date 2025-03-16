import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { X } from "lucide-react";
import { toast } from "sonner";

import { useCurrentUserInfo } from "~/hooks/user";
import cross from "../../assets/cross.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface PostEditingProp {
  finalButtonName: string;
}

const PostEditing: React.FC<PostEditingProp> = ({ finalButtonName }) => {
  const { data: user } = useCurrentUserInfo();
  const { user: currentUser } = useUser();

  const [title, setTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const verifyPostInput = () => {
    if (title === "") {
      toast.error("Title cannot be empty!");
    } else {
      toast.success("Post was created."); // make this handle the actual post creation
    }
  };

  const imagesTemp = [
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
  ]; // temporarily hardcoded

  return (
    <DialogContent className="h-570px w-full overflow-y-auto">
      <DialogHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Avatar>
            <AvatarImage src={currentUser?.imageUrl} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <DialogTitle>User {user?.userId}</DialogTitle>
        </div>
      </DialogHeader>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col items-center space-y-1.5">
          <Label htmlFor="title" className="w-[754px] text-left">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter post title"
            className="w-[754px] rounded-[10px] bg-[#EFF2FB] p-4"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col items-center space-y-1.5">
          <Label htmlFor="contents" className="w-[754px] text-left">
            Content
          </Label>
          <Textarea
            placeholder="Enter post content"
            id="contents"
            className="h-[254px] w-[754px] rounded-[10px] bg-[#EFF2FB] p-4"
          />
        </div>
        {imagesTemp.length > 0 && (
          <Carousel className="mx-auto w-4/5 max-w-xs">
            <CarouselContent>
              {imagesTemp.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="relative flex h-full items-center justify-center p-1">
                      <Card>
                        <CardContent className="p-3">
                          <Button className="absolute right-16 top-0 z-10 h-[35px] w-[35px] rounded-full bg-[#2E4D90]">
                            <X className="h-4 w-4" />
                          </Button>
                          <Image
                            src={image}
                            alt={`Uploaded preview ${index + 1}`}
                            width={160}
                            height={160}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
      <DialogFooter className="flex justify-between">
        <Button
          variant="outline"
          type="button"
          className="h-[48px] w-[166px] gap-[10px] rounded-[24px] border-[1px] border-[#2E4D90] pb-[12px] pl-[16px] pr-[16px] pt-[12px]"
        >
          <Image
            // eslint-disable-next-line
            src={cross}
            alt="Cross icon"
            width={16}
            height={16}
            className="rotate-45 transform"
          />
          Add Photos
        </Button>
        <Button
          className="relative h-[48px] w-[161px] gap-[10px] rounded-[24px] bg-[#2E4D90] pb-[17px] pl-[80px] pr-[80px] pt-[17px]"
          type="submit"
          onClick={verifyPostInput}
        >
          {finalButtonName}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default PostEditing;
