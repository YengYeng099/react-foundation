import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useAppSelector } from "../../redux/hook";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarComponent() {
  const isLogined = false;
  const count = useAppSelector((state) => state.Counter.count);

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex shrink-0 items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
                  i
                </span>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  ISHOP
                </span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden sm:flex sm:items-center sm:gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right side: auth + notifications */}
              <div className="hidden sm:flex sm:items-center sm:gap-3">
                <button
                  type="button"
                  className="relative rounded-full p-1.5 text-gray-400 hover:text-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                      {count}
                    </span>
                  )}
                </button>

                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    {isLogined ? (
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-9 rounded-full bg-gray-100 outline outline-offset-1 outline-gray-200"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link
                          to="/auth/login"
                          className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Login
                        </Link>
                        <Link
                          to="/auth/register"
                          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </MenuButton>
                </Menu>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon aria-hidden="true" className="block size-6" />
                  ) : (
                    <Bars3Icon aria-hidden="true" className="block size-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 border-t border-gray-100 px-4 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
                <DisclosureButton
                  as={Link}
                  to="/auth/login"
                  className={classNames(
                    "rounded-md px-3 py-2 text-center text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600",
                  )}
                >
                  Login
                </DisclosureButton>
                <DisclosureButton
                  as={Link}
                  to="/auth/register"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-indigo-500"
                >
                  Sign Up
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
