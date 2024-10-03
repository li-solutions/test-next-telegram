'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import {logOutRoute} from "@/lib/appRoutes";
import {useLayoutEffect, useState} from "react";

export default function Navbar() {
const [userName, setUserName] = useState<string | null>(null);
  async function logout() {
    await fetch(logOutRoute())
    await localStorage.removeItem("username")
    window.location.href = '/';
  }

  useLayoutEffect(() => {
    const user = localStorage.getItem('username');
    if(user) {
      setUserName(user)
    }
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'username') {
        setUserName(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
  <div className="py-4 flex justify-center">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem hidden={!!userName}>
          <Link href="/sign-in" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sign-in
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem hidden={!userName}>
          <button onClick={logout}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sign out
            </NavigationMenuLink>
          </button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
  )
}