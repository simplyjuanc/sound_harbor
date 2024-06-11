import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomAlphanumString (length = 64): string {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return encodeURIComponent(text);
}

type TimeInterval = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';
export function addTimeInterval(date: Date, amount: number, interval: TimeInterval): Date {
    const newDate = new Date(date.getTime()); // Create a new date object to avoid mutating the original date

    switch (interval) {
        case 'years':
            newDate.setFullYear(date.getFullYear() + amount);
            break;
        case 'months':
            newDate.setMonth(date.getMonth() + amount);
            break;
        case 'days':
            newDate.setDate(date.getDate() + amount);
            break;
        case 'hours':
            newDate.setHours(date.getHours() + amount);
            break;
        case 'minutes':
            newDate.setMinutes(date.getMinutes() + amount);
            break;
        case 'seconds':
            newDate.setSeconds(date.getSeconds() + amount);
            break;
        default:
            throw new Error(`Invalid interval.`);
    }

    return newDate;
}