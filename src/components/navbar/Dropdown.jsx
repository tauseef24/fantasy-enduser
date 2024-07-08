import React, { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getSports } from "../../services/sports";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  const [sports, setSports] = useState([]);

  const fetchSports = () => {
    getSports()
      .then((res) => {
        setSports(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="font-medium flex items-center text-lg transition-colors hover:text-violet-700 outline-none"
          aria-label="Customise options"
        >
          Sports
          <MdKeyboardArrowDown />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-white rounded-md p-[5px] shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
          sideOffset={5}
        >
          <Link to={"/sports"}>
            <DropdownMenu.Item className="px-3 py-2.5 text-gray-800 font-medium hover:text-white rounded-lg text-sm hover:outline-none hover:bg-violet-700">
              All Sports
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator className="h-[1px] bg-violet-700 m-[5px]" />
          {sports.map((sport) => (
            <React.Fragment key={sport._id}>
              <Link to={`/${sport._id}`}>
                <DropdownMenu.Item className="px-3 py-2 font-medium text-gray-800 hover:text-white text-sm hover:outline-none hover:bg-violet-700 rounded-lg">
                  {sport.sport}
                </DropdownMenu.Item>
              </Link>
            </React.Fragment>
          ))}
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
