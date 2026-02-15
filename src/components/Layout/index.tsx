import type { RootState } from "../../state/store"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { fetchMachines } from "../../state/machines/machinesSlice";
import { useState, type ReactNode } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()
  const { machines, loading, error } = useSelector(
    (state: RootState) => state.machines
  )

  useEffect(() => {
    dispatch(fetchMachines())
  }, [dispatch])

  
  if (loading) return <p>Cargando máquinas...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1">
        <Header setOpen={setOpen} />
        <main className="p-6 overflow-auto">{children}</main>
        
      </div>
    </div>
  );
}