/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "@/recoilStateManagement/modatlAtom";
// icons
import { BiSearch, BiPlusCircle, BiHeart, BiMenu } from "react-icons/bi";
import {
  HiOutlineUserGroup,
  HiHome,
  HiOutlinePaperAirplane,
} from "react-icons/hi";

function Header() {
  // fetch session details
  const { data: session } = useSession();
  // fetch router instance
  const router = useRouter();
  // call recail for modal state management
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        {/* left */}
        <div className="relative hidden md:inline-grid w-24  cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="http://links.papareact.com/ocw"
            alt="logo"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
        <div className="relative  md:hidden w-10  flex-shrink-0 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="http://links.papareact.com/jjm"
            alt="logo"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>

        {/* middle serch input field*/}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-2 md:space-x-4">
          <HiHome className="navBtn" onClick={() => router.push("/")} />
          <BiPlusCircle
            className="h-7 w-7  md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          />

          {session ? (
            <>
              <div className="relative navBtn">
                <HiOutlinePaperAirplane className="navBtn " />
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-xs w-5 h-5 text-white ">
                  3
                </div>
              </div>
              <BiPlusCircle className="navBtn" onClick={() => setOpen(true)} />
              <HiOutlineUserGroup className="navBtn" />
              <BiHeart className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="img"
                className="h-10 w-10 rounded-full cursor-pointer "
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
