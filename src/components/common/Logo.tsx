import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export function Logo({
  variant = "light",
  size = "md",
}: LogoProps) {
  const iconSize = size === "sm" ? 34 : size === "lg" ? 48 : 42;

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Modern App Store Squircle Badge */}
      <div
        className="relative shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/logo.svg"
          alt="Local Jobs Logo"
          width={iconSize}
          height={iconSize}
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </div>

      {/* Modern Typography */}
      <div className="flex items-baseline leading-none">
        <span
          className={`font-black tracking-tight ${
            size === "sm"
              ? "text-lg"
              : size === "lg"
              ? "text-2xl sm:text-3xl"
              : "text-xl sm:text-2xl"
          } ${variant === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Local
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-amber-500">
            Jobs
          </span>
        </span>
      </div>
    </div>
  );
}
