"use client";
import { useState } from "react";
import { SearchProduct } from "../../_global/components/SearchProduct";
import { actionButtonClient } from "../utils/actionButtonClient";

export default function MainDashboardClient() {
  const actionButton = actionButtonClient;
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="flex justify-between">
        <SearchProduct value={searchValue} setValue={setSearchValue} />

        <div className="flex gap-2">
          {actionButton.map((button, index) => (
            <div key={index}>{button.component}</div>
          ))}
        </div>
      </div>
    </>
  );
}
