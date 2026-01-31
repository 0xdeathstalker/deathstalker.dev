import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/&/g, "-and-") // replace & with 'and'
    .replace(/[^\w\-]+/g, "") // remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // replace multiple - with single -
}
