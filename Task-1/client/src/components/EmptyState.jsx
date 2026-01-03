import { ImageIcon } from "lucide-react";

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-neutral-400">
      <ImageIcon size={48} className="mb-4 opacity-20" />
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
