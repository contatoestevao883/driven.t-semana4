/* eslint-disable prettier/prettier */
import { ApplicationError } from "@/protocols";

export function forbiddenError(): ApplicationError {
  return {
    name: 'ForbiddenError',
    message: 'No results',
  };
}