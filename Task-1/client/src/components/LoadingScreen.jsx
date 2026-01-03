import { Loader2 } from 'lucide-react';
export default function LoadingScreen() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="animate-spin text-rose-500" size={48} />
    </div>
  );
}
