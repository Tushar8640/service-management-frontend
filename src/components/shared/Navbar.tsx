import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useGetSingleCartQuery } from "@/redux/features/cart/cartApi";
import { useGetSingleUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { Input } from "../ui/input";
import { SetStateAction, useEffect, useState } from "react";
import { searched } from "@/redux/features/filter/filterSlice";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user } = useAppSelector((state) => state?.auth);

  const { data: userData } = useGetSingleUserQuery(user?.id);
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector(
    (state: { filter: { searchText: any } }) => state.filter.searchText
  );
  const router = useRouter();
  //log out
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };

  const handleSearch = (text: SetStateAction<string>) => {
    setSearchText(text);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (searchText) {
          dispatch(searched(searchText));
        }
        if (searchText && router.pathname !== "/services/search") {
          router.push("/services/search");
        }

        console.log(router.pathname);
      }, 2000);
    };

    debouncedSearch();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  useEffect(() => {
    setSearchText(searchTerm);
  }, [router]);

  console.log(searchText);
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 text-primary">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="flex items-center">
            <Link href="/" className="text-gray-900">
              PHOTOWALA
            </Link>
          </div>
          <div className="flex items-center">
            <Input
              value={searchText}
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div>
            <ul className="flex items-center">
              <li className="">
                <Button variant="link" asChild>
                  <Link href="/" className="text-gray-900">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="/services" className="text-gray-900">
                    Services
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="/bookings" className="text-gray-900">
                    Bookings
                  </Link>
                </Button>
              </li>

              {user.role !== "user" && user.role && (
                <li>
                  <Button variant="link" asChild>
                    <Link href="/dashboard" className="text-gray-900">
                      Dashboard
                    </Link>
                  </Button>
                </li>
              )}
              {/* //cart  */}
              <li>
                <Link href="/cart" className="text-gray-900 flex items-center">
                  <ShoppingBasket />
                </Link>
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* login signup btton render depending on users email  */}
                    {!user?.email && (
                      <>
                        <Link href="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/register">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user?.email && (
                      <>
                        <DropdownMenuItem className="cursor-pointer font-semibold font-serif">
                          <Link href={"/profile"}>
                            {userData?.data?.name?.firstName}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
