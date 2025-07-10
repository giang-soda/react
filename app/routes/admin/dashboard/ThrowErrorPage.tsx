import { ErrorResponseHandler } from '~/lib/errors';

export default function ThrowErrorPage() {
  throw new ErrorResponseHandler(500);
}
