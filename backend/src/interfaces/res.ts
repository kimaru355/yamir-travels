export interface Res<T> {
  success: boolean;
  message: string;
  data: T;
}
