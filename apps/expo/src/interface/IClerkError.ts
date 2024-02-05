export default interface IClerkError {
  status: number;
  clerkError: boolean;
  errors: {
    code: string;
    message: string;
    longMessage: string;
    meta: {
      paramName: string;
    };
  }[];
}
