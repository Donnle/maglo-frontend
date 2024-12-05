export interface Response<T> {
  data: T;
  code: number;
  message: string;
}

export interface ResponseError {
  code: number;
  type: string;
  message: string;
}
