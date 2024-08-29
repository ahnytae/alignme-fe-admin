import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-large',
        'text-heading-large',
        'text-heading-medium',
        'text-heading-small',
        'text-heading-tiny',
        'text-label-large',
        'text-label-base',
        'text-label-small',
        'text-label-tiny',
        'text-paragraph-large',
        'text-paragraph-base',
        'text-paragraph-small',
        'text-paragraph-tiny',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
