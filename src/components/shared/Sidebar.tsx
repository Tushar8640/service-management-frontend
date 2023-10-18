/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sidebarActiveChange } from "@/redux/features/activeLink/activeLinkSlice";
import { pathChange } from "@/redux/features/filter/filterSlice";
import Link from "next/link";
import { useRouter } from "next/router";
//sidebar of seller dashboard
const Sidebar = () => {
  const active = useAppSelector((state) => state?.active?.sidebarActive);
  const path = useAppSelector((state) => state?.filter?.path);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const activeLink = path.split("/")[2];
    dispatch(sidebarActiveChange(activeLink));
  }, [path, dispatch]);

  //changing path when route change
  useEffect(() => {
    dispatch(pathChange(router.pathname));
  }, [location, dispatch]);
  console.log(active);
  return (
    <div className={`md:flex flex-col bg-gray-300 h-full text-gray-800`}>
      <div className="space-y-3  ">
        <div className="flex-1">
          {/* <img src={logo} alt="logo" className="w-14" /> */}
          {/* sidebar link  */}
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li
              className={`${
                active === "seller" ? "link-active" : "link-hover"
              }`}
            >
              <Link href="/dashboard/seller" className="link-styles">
                Dashboard
              </Link>
            </li>

            <li
              className={`${
                active === "addproduct" ? "link-active" : "link-hover"
              }`}
            >
              <Link href="/dashboard/addproduct" className="link-styles">
                Add product
              </Link>
            </li>
            <li
              className={`${
                active === "products" ? "link-active" : "link-hover"
              }`}
            >
              <Link href="/dashboard/products" className="link-styles">
                Products
              </Link>
            </li>
            <li
              className={`${active === "users" ? "link-active" : "link-hover"}`}
            >
              <Link href="/dashboard/users" className="link-styles">
                Users
              </Link>
            </li>
            <li className={`${active === "/" ? "link-active" : "link-hover"}`}>
              <Link href="/" className="link-styles">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
