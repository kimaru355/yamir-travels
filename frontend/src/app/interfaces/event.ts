export interface Event {
  id: string;
  destination: string;
  country: string;
  duration: number;
  durationType: string;
  price: number;
  tourType: string;
  images: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
export interface EventImagesArray {
  id: string;
  destination: string;
  country: string;
  duration: number;
  durationType: string;
  price: number;
  tourType: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
// durationType: "year" | "month" | "week" | "day" | "hour";
