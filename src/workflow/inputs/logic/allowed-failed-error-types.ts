const allowedfailErrorTypes = ['main-task', 'sub-task'] as const;
export type FailErrorType = (typeof allowedfailErrorTypes)[number];

export const isValidFailErrorType = (value: string): value is FailErrorType =>
  allowedfailErrorTypes.includes(value as FailErrorType);
