import React from "react";

export const metadata = {
  title: "BidFlare Admin",
  description: "Manage Everything via BidFlare Admin Dashboard",
};

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pt-4">{children}</main>
    </>
  );
}
