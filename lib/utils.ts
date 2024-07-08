import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const shuffleArray = (array: any = []) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const selectRandomArrayElements = (array: any = [], count: number) => {
  const shuffledArray = shuffleArray(array);
  const selectedElements = shuffledArray.slice(0, count);
  return selectedElements;
}