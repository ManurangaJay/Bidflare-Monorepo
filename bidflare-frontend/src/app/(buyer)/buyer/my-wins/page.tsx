import { Suspense } from "react";
import MyWinsPageContent from "./MyWinsPageContent";
import RoleGuard from "@/components/RoleGuard";

export default function MyWinsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoleGuard allowedRoles={["BUYER"]}>
        <MyWinsPageContent />
      </RoleGuard>
    </Suspense>
  );
}
