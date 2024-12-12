import Link from "next/link";

export function Titulo() {
  return (
    <nav className="bg-orange-400 border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto p-4">
        <Link href="/principal" className="flex items-center">
          <img src="/logo.webp" className="h-16" alt="" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap">
            Revenda Avenida: Admin
          </span>
        </Link>
      </div>
    </nav>
  );
}
