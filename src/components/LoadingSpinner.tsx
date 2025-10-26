export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
    return (
      <div className="flex justify-center items-center p-8">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-primary`}></div>
      </div>
    );
  }
  