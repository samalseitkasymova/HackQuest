import { createContext, useContext, useState, ReactNode } from "react";
import { Lab } from "../types/Lab";
import { labs as initialLabs } from "../services/labService";

interface AdminLabContextType {
  labs: Lab[];
  addLab: (lab: Omit<Lab, "id">) => void;
  updateLab: (id: number, lab: Partial<Lab>) => void;
  deleteLab: (id: number) => void;
  toggleLab: (id: number) => void;
}

const AdminLabContext = createContext<AdminLabContextType | undefined>(
  undefined
);

export function AdminLabProvider({ children }: { children: ReactNode }) {
  const [labs, setLabs] = useState<Lab[]>(
    initialLabs.map((lab) => ({
      ...lab,
      completed: false,
      unlocked: false,
    }))
  );

  const addLab = (labData: Omit<Lab, "id">) => {
    const newId = labs.length > 0 ? Math.max(...labs.map((l) => l.id)) + 1 : 1;
    const newLab: Lab = {
      ...labData,
      id: newId,
      completed: false,
      unlocked: false,
    };
    setLabs([...labs, newLab]);
    // TODO: POST /api/admin/labs
  };

  const updateLab = (id: number, updates: Partial<Lab>) => {
    setLabs(
      labs.map((lab) => (lab.id === id ? { ...lab, ...updates } : lab))
    );
    // TODO: PUT /api/admin/labs/{id}
  };

  const deleteLab = (id: number) => {
    setLabs(labs.filter((lab) => lab.id !== id));
    // TODO: DELETE /api/admin/labs/{id}
  };

  const toggleLab = (id: number) => {
    setLabs(
      labs.map((lab) =>
        lab.id === id
          ? { ...lab, unlocked: !lab.unlocked }
          : lab
      )
    );
    // TODO: PUT /api/admin/labs/{id} - update status
  };

  return (
    <AdminLabContext.Provider value={{ labs, addLab, updateLab, deleteLab, toggleLab }}>
      {children}
    </AdminLabContext.Provider>
  );
}

export function useAdminLabContext() {
  const context = useContext(AdminLabContext);
  if (context === undefined) {
    throw new Error("useAdminLabContext must be used within AdminLabProvider");
  }
  return context;
}
