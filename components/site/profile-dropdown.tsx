"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  ArrowLeft,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

type ProfileDropdownProps = {
  displayName: string;
  email?: string | null;
  variant?: "user" | "admin";
};

type MenuItemProps = {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
  variant?: "default" | "danger";
};

function MenuItem({ href, icon, label, onSelect, variant = "default" }: MenuItemProps) {
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
    variant === "danger"
      ? "text-destructive hover:bg-destructive/10"
      : "text-foreground hover:bg-white/8",
  );

  if (href) {
    return (
      <Link href={href} role="menuitem" className={className} onClick={onSelect}>
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <button type="button" role="menuitem" className={className} onClick={onSelect}>
      {icon}
      {label}
    </button>
  );
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProfileDropdown({
  displayName,
  email,
  variant = "user",
}: ProfileDropdownProps) {
  const homeHref = variant === "admin" ? "/admin" : "/dashboard";
  const profileHref =
    variant === "admin" ? "/admin/settings" : "/dashboard/profile";
  const settingsHref =
    variant === "admin" ? "/admin/settings" : "/dashboard/settings";
  const isClient = useIsClient();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 240,
  });
  const [pending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const initial = displayName.charAt(0).toUpperCase();

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) {
      setOpen(false);
    }
  }

  const close = useCallback(() => setOpen(false), []);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const menuWidth = 260;
    const padding = 8;
    let left = rect.right - menuWidth;
    left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));
    setMenuStyle({
      top: rect.bottom + padding,
      left,
      width: menuWidth,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      close();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const menu = open && isClient ? (
    <>
      <div
        className="fixed inset-0 z-[200]"
        aria-hidden
        onClick={close}
      />
      <div
        ref={menuRef}
        id="profile-dropdown-menu"
        role="menu"
        aria-orientation="vertical"
        style={{
          position: "fixed",
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
        }}
        className="profile-dropdown-menu animate-dropdown-in z-[210] rounded-xl border border-white/10 p-1.5 shadow-2xl"
      >
        <div className="rounded-lg bg-white/5 px-3 py-2.5">
          <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          {email ? (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          ) : null}
        </div>
        <div className="my-1.5 space-y-0.5">
          <MenuItem
            href={homeHref}
            icon={<LayoutDashboard className="h-4 w-4 shrink-0 text-primary" />}
            label={variant === "admin" ? "Overview" : "Dashboard"}
            onSelect={close}
          />
          <MenuItem
            href={profileHref}
            icon={<User className="h-4 w-4 shrink-0 text-muted-foreground" />}
            label="Profile"
            onSelect={close}
          />
          <MenuItem
            href={settingsHref}
            icon={<Settings className="h-4 w-4 shrink-0 text-muted-foreground" />}
            label="Settings"
            onSelect={close}
          />
          {variant === "admin" ? (
            <MenuItem
              href="/"
              icon={<ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />}
              label="Back to app"
              onSelect={close}
            />
          ) : null}
        </div>
        <div className="my-1 border-t border-white/10" />
        <MenuItem
          icon={<LogOut className="h-4 w-4 shrink-0" />}
          label={pending ? "Signing out…" : "Sign out"}
          variant="danger"
          onSelect={() => {
            close();
            startTransition(() => void signOut());
          }}
        />
      </div>
    </>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!open) updatePosition();
          setOpen((v) => !v);
        }}
        className={cn(
          "relative z-[220] flex items-center gap-2 rounded-full border border-border/60 bg-white/5 py-1 pl-1 pr-2.5 transition-all",
          "hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "border-primary/40 bg-white/10 ring-2 ring-primary/25",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? "profile-dropdown-menu" : undefined}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--glow-blue)] to-[var(--glow-purple)] text-sm font-bold text-white shadow-md">
          {initial}
        </span>
        <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">
          {displayName}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {isClient && menu ? createPortal(menu, document.body) : null}
    </>
  );
}
