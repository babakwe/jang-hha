import { LESSONS } from "@/lib/data";
import LessonWatch from "./view";

export function generateStaticParams() { return LESSONS.map(l => ({ id: l.id })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonWatch id={id} />;
}
