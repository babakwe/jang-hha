import { PROCEDURES } from "@/lib/data";
import ProcedureView from "./view";

export function generateStaticParams() { return PROCEDURES.map(p => ({ id: p.id })); }
export const dynamicParams = false;

export default async function ProcedurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProcedureView id={id} />;
}
