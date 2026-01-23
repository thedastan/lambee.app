import { Suspense } from "react";
import Registration from "@/components/auth/registration/Registration";

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div></div>}>
      <Registration />
    </Suspense>
  );
}
