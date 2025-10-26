import { AlertCircle } from 'lucide-react';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-lg bg-red-50 p-4 border border-red-200">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </div>
  );
}
