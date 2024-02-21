import { isClerkAPIResponseError } from "@clerk/clerk-expo";

/**
 * Extracts the error message from the given error. Handles special error types such as ClerkAPIResponseError
 *
 * @param error The error that is thrown, can be of any type
 * @returns A string describing the error in detail
 */
export function getErrorMessage(error: unknown): string {
  // Our default fallback of just turning the error into a string
  let errorMessage = String(error);

  // If we can at least cast it as Error, do so and use the message
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Special handling of different types here
  if (isClerkAPIResponseError(error)) {
    errorMessage = error.errors[0]?.longMessage ?? errorMessage;
  }
  return errorMessage;
}
