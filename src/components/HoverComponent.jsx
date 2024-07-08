import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { MdOutlineErrorOutline } from "react-icons/md";

const HoverComponent = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div
          className="inline-block rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
          target="_blank"
          rel="noreferrer noopener"
        >
          <MdOutlineErrorOutline size={24} color="red" />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col gap-[7px]">
            <h1 className="font-bold">
              Create Your Fantasy Dream 11 Team to Access Contests!
            </h1>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverComponent;
