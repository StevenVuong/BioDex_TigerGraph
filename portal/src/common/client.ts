type PendingResponse = {
  status: "pending";
  data: null;
};
type ErrorResponse = {
  status: "error";
  data: null;
};

type SuccessResponse<T = any> = {
  status: "success";
  data: T;
};

export type ApiResponse<T = any> =
  | PendingResponse
  | ErrorResponse
  | SuccessResponse<T>;
