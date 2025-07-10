import type React from 'react';
import { type TAny } from '~/lib/types';

export const toCamelCase = (input: string): string => {
  return input.replace(/_([a-zA-Z0-9])/g, (_, char) => {
    if (/[a-zA-Z]/.test(char)) {
      return char.toUpperCase();
    }
    return char;
  });
};

/**
 * convert all key of data to camelCase
 *
 * @param structure
 *  example: {
 *    firstName: String,
 *    status: Boolean,
 *    connection: [
 *      {
 *        phone: Number,
 *        list: [Number],
 *      },
 *    ],
 *  }
 */
export const bodyToCamelCase = (
  data: Record<string, React.ReactNode>,
  struct: Record<string, TAny>
): Record<string, TAny> => {
  const result: Record<string, TAny> = {};

  for (const [camelKey, valueType] of Object.entries(struct)) {
    const rawValue = findRawValueData(data, camelKey);

    if (rawValue === undefined || rawValue === null) continue;

    if (Array.isArray(valueType) && Array.isArray(rawValue)) {
      const itemStruct = valueType[0];
      result[camelKey] = rawValue.map((item: TAny) =>
        typeof itemStruct === 'object' && itemStruct !== null
          ? bodyToCamelCase(item, itemStruct)
          : convertPrimitive(item, itemStruct)
      );
    } else if (typeof valueType === 'object' && valueType !== null && !Array.isArray(valueType)) {
      result[camelKey] = bodyToCamelCase(rawValue as TAny, valueType);
    } else {
      result[camelKey] = convertPrimitive(rawValue, valueType);
    }
  }

  return result;
};

const findRawValueData = (
  data: Record<string, React.ReactNode>,
  camelKey: string
): React.ReactNode | undefined => {
  const snakeKey = Object.keys(data).find(key => toCamelCase(key) === camelKey);

  if (!snakeKey) {
    return undefined;
  }

  return data[snakeKey];
};

const convertPrimitive = (value: React.ReactNode, type: object): TAny => {
  if (type === Date) {
    const d = value instanceof Date ? value : new Date(value as string);
    return d.toISOString();
  }

  if (type === Number) {
    return Number(value);
  }

  if (type === Boolean) {
    return Boolean(value);
  }

  if (type === String) {
    if (typeof value === 'string' || value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  return value;
};
