import type React from 'react';
import type { ErrorResponse } from 'react-router';

/**
 * Utility class we use to hold auto-wrapped 4xx/5xx Response bodies
 *
 * @example
 * throw new ErrorResponseHandler(404);
 */
export class ErrorResponseHandler extends Error implements ErrorResponse {
  status: number;
  statusText: string;
  data: Record<string, React.ReactNode>;
  internal: boolean;

  constructor(
    status: number,
    statusText = '',
    data: Record<string, React.ReactNode> = {},
    internal = false
  ) {
    super(statusText);

    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.internal = internal;
  }
}
