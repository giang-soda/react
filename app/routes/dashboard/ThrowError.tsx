import { ErrorResponseHandler } from '~/lib/errors';

export default function ThrowError() {
  throw new ErrorResponseHandler(500);
}
