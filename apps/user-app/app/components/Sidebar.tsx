"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return (
      <div 
        className={`flex items-center my-2 px-4 py-2 rounded-lg cursor-pointer ${selected ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        onClick={() => {
          router.push(href);
        }}
      >
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold`}>
            {title}
        </div>
      </div>
    );
}