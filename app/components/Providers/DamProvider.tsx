import { Dam, DamContextType } from "@/lib/definitions";
import { ReactElement, useState, createContext } from "react";

export const DamContext = createContext<DamContextType | null>(null);

export function DamProvider({ children }: { children: ReactElement }) {
  const dams = [
    { name: "khadakwasla", longitude: 17.65, latitude: 77.68 },
    { name: "Panshet", longitude: 17.65, latitude: 77.68 },
    { name: "xyz", longitude: 17.65, latitude: 77.68 },
  ];

  const [currentDam, setCurrentDam] = useState<Dam>(dams[0]);

  return (
    <DamContext.Provider value={{ currentDam, setCurrentDam }}>
      {children}
    </DamContext.Provider>
  );
}

export default DamProvider;
