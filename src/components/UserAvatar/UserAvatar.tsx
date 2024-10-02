'use client'
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"

import avatar from "@/components/UserAvatar/124599.jpeg"
import { useLayoutEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function UserAvatar() {

  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useLayoutEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserAvatar = localStorage.getItem('userAvatar');
    if(storedUsername){
      setUserName(storedUsername)
    }
    if(storedUserAvatar) {
      setUserAvatar(storedUserAvatar)
    }
  }, []);

  useLayoutEffect(() => {
    const { searchParams } = new URL(window.location.href);
    if(searchParams.toString()) {
      const userName = searchParams.get('userName');
      const userAvatar = searchParams.get('userAvatar');

      if (userName) {
        const userNameFromUrl  = decodeURIComponent(userName).replace('|', " ")
        setUserName(userNameFromUrl);
        localStorage.setItem('username',userNameFromUrl )
      }
      if (userAvatar) {
        setUserAvatar(userAvatar);
        localStorage.setItem('userAvatar',userAvatar )
      }
      router.replace(window.location.pathname)
    }
  }, [router]);

  return (
  <div className="flex gap-4 justify-center items-center p-8">
    {userName && (<>
      <Avatar>
        <AvatarImage src={userAvatar||avatar.src} alt="avatar"/>
      </Avatar>
      <h3>Welcome, {userName}</h3>
    </>)}
  </div>
  )
}
