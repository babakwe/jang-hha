import { PROCEDURES } from "@/lib/data";
import WatchView from "./view";

export function generateStaticParams() { return PROCEDURES.map(p => ({ id: p.id })); }
export const dynamicParams = false;

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WatchView id={id} />;
}
