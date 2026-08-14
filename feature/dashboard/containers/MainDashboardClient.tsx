"use client";
import { useState } from "react";
import { SearchProduct } from "../../_global/components/SearchProduct";
import { actionButtonClient } from "../utils/actionButtonClient";

export default function MainDashboardClient() {
  const actionButton = actionButtonClient;
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 w-full">
      <SearchProduct value={searchValue} setValue={setSearchValue} />

      <div className="flex flex-wrap items-center gap-2">
        {actionButton.map((button, index) => (
          <div key={index}>{button.component}</div>
        ))}
      </div>
    </div>
  );
}
