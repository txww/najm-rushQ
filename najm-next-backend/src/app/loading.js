export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-gold,#C28A17)] mx-auto mb-4"></div>
        <p className="text-white text-lg">جاري التحميل...</p>
      </div>
    </div>
  );
}
