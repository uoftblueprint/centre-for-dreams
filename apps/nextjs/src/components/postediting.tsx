import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PostType } from "types/types";

import { useCurrentUserInfo } from "~/hooks/user";
import { api } from "~/utils/api";
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
  postType: PostType;
  finalButtonName: string;
}

interface FormData {
  title: string;
  contents: string;
}

const PostEditing: React.FC<PostEditingProp> = ({
  postType,
  finalButtonName,
}) => {
  const { data: user } = useCurrentUserInfo();
  const { user: currentUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { mutate: createAnnouncement, error } =
    api.announcement.createAnnouncement.useMutation({
      onSuccess: () => {
        toast.success("Post was created.");
        reset(); // Reset form fields
      },
      onError: () => {
        toast.error(`Something went wrong: ${error?.message}`);
      },
    });

  const onSubmit = (data: FormData) => {
    createAnnouncement({
      title: data.title,
      contents: data.contents,
    });
  };

  const imagesTemp = [
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
    "https://i.pinimg.com/736x/ef/7e/46/ef7e4652e72d2f829827c60b03300a39.jpg",
  ]; // temporarily hardcoded

  return (
    <DialogContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={currentUser?.imageUrl} />
              <AvatarFallback>{user?.userId}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-lg font-medium">
              {user?.userId ? `User ${user.userId}` : "New Post"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter post title"
              className="bg-muted/50"
              {...register("title", { required: true })}
            />
            {errors.title && <span>Title is required</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contents" className="text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="contents"
              placeholder="Enter post content"
              className="bg-muted/50 min-h-[180px]"
              {...register("contents", { required: true })}
            />
            {errors.contents && <span>Content is required</span>}
          </div>

          {postType !== PostType.Announcement && imagesTemp.length > 0 && (
            <div className="bg-background mx-auto w-full max-w-md rounded-lg border p-2">
              <Carousel className="w-full">
                <CarouselContent>
                  {imagesTemp.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full md:basis-1/2"
                    >
                      <div className="p-1">
                        <Card className="overflow-hidden border-0 shadow-sm">
                          <CardContent className="relative p-0">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="bg-background/80 hover:bg-background absolute right-2 top-2 z-10 h-7 w-7 rounded-full shadow-sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="overflow-hidden rounded-lg">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Uploaded preview ${index + 1}`}
                                width={160}
                                height={160}
                                className="aspect-square h-auto w-full object-cover"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-1 p-1">
                  <CarouselPrevious className="h-8 w-8 rounded-full" />
                  <CarouselNext className="h-8 w-8 rounded-full" />
                </div>
              </Carousel>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {postType !== PostType.Announcement && (
            <Button
              variant="outline"
              type="button"
              className="w-full gap-2 sm:w-auto"
            >
              Add Photos
            </Button>
          )}
          <Button className="w-full sm:w-auto" type="submit">
            {finalButtonName}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PostEditing;
