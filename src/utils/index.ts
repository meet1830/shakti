import Config from 'react-native-config';
import {ConfigKey} from '@modules/types';

export function getConfig(key: ConfigKey): string | undefined {
  return Config[key];
}

export function cacheTimeLimitNotExceeded(
  dateString: string,
  limitInMins: number,
) {
  return (
    new Date().getTime() - new Date(dateString).getTime() <
    limitInMins * 60 * 60 * 1000
  );
}

export function formatCurrency(paise: number) {
  if (paise % 10 === 0) {
    return '₹' + paise / 100;
  }
  return '₹' + (paise / 100).toFixed(2);
}

export function formatDate(date: Date | string) {
  const input = new Date(date);

  const datePart = input.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timePart = input.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${datePart} at ${timePart}`;
}
