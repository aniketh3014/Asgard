"use client"

import { PrismaClient } from '@repo/database/client';
import { useBalance } from '@repo/store/useBalance'

export default function Page(): JSX.Element {
  const balance = useBalance();
  return (
    <div className="bg-red-500 h-screen">
      {balance.toString()}
    </div>
  );
}
