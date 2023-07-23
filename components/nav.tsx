"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

import { Text, TextPreset } from "./text";

type Provider = {
  [key: string]: any;
  id: string;
};

export const Nav = () => {
  const [providers, setProviders] = useState<any | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const asyncProvioders = async () => {
      const res = await getProviders();
      if (!res || Object.values(res).length === 0) return;
      setProviders(res);
    };

    asyncProvioders();
  }, []);

  return (
    <nav className="flex justify-between mb-16">
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="rounded-full bg-amaranth">
              <Text
                text="Create Post"
                preset={TextPreset.P}
                tailWindStyle="px-3 py-1"
              />
            </Link>
            <button
              className="rounded-full"
              type="button"
              onClick={() => {
                console.log("clock");
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((item, index) => {
                const provider = item as Provider;
                return (
                  <button
                    className="rounded-full bg-amaranth px-3 py-1"
                    type="button"
                    key={provider ? provider.id : index}
                    onClick={() => {
                      signIn(provider ? provider.id : "");
                    }}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="rounded-full bg-amaranth px-3 py-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((item) => {
                const provider = item as Provider;
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="rounded-full bg-amaranth px-3 py-1"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};
