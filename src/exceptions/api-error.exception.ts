export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: string[]
  ) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static NotFound(message: string, errors?: any[]) {
    return new ApiError(404, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not logged in.');
  }

  static BadRequest(message: string, errors?: any[]) {
    return new ApiError(400, message, errors);
  }
}
