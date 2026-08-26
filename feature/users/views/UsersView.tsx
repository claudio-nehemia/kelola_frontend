import { Suspense } from "react";
import { UsersContainer } from "../containers/UsersContainer";

export function UsersView() {
  return (
    <Suspense
      fallback={
        <p className="text-center py-10 text-gray-500">
          Memuat data pengguna & staf...
        </p>
      }
    >
      <UsersContainer />
    </Suspense>
  );
}
