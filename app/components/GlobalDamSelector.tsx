import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { DamContext } from "./Providers/DamProvider";
import { Dam, DamContextType } from "@/lib/definitions";

function GlobalDamSelector() {
  const dams = [
    { name: "khadakwasla", longitude: 17.65, latitude: 77.68 },
    { name: "Panshet", longitude: 17.65, latitude: 77.68 },
    { name: "xyz", longitude: 17.65, latitude: 77.68 },
  ];
  const damContext = useContext(DamContext);

  if (!damContext) {
    throw new Error("DamContext must be used within a DamProvider");
  }

  const { currentDam, setCurrentDam } = damContext;

  useEffect(() => {
    // fetch dam names and persist
  });

  const handleChange = (event: any) => {
    setCurrentDam(
      dams.find((dam: Dam) => dam.name === event.target.value) || dams[0]
    );
    console.log(currentDam);
  };

  return (
    <div className="fixed top-0 left-0 z-10 bg-white text-black dark:bg-black dark:text-white w-full border-b-[1px] border-slate-300/20 px-3 py-2">
      <form>
        <label>
          Select a dam:
          <select
            value={currentDam.name}
            onChange={handleChange}
            className="dark:bg-black dark:text-white focus:outline-transparent px-4 py-1 ml-2"
          >
            {dams.map((dam) => {
              return (
                <option key={nanoid()} value={dam.name}>
                  {dam.name}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </div>
  );
}

export default GlobalDamSelector;
