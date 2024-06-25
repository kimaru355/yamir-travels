import { Request, Response } from "express";
import { Review } from "../interfaces/review";
import { ReviewService } from "../services/review.service";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reviewService = new ReviewService();
  const review: Review = req.body;
  review.id = v4();
  review.userId = getIdFromToken(req);
  if (
    !review.id ||
    !review.eventId ||
    !review.userId ||
    !review.rating ||
    !review.comment ||
    review.rating < 1 ||
    review.rating > 5
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const response: Res<null> = await reviewService.createReview(review);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getReviews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reviewService = new ReviewService();
  const response: Res<Review[] | null> = await reviewService.getAllReviews();
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getReviewsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reviewService = new ReviewService();
  const userId: string = req.params.userId;
  const response: Res<Review[] | null> = await reviewService.getReviewsByUserId(
    userId
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getReviewsByEventId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reviewService = new ReviewService();
  const eventId: string = req.params.eventId;
  const response: Res<Review[] | null> =
    await reviewService.getReviewsByEventId(eventId);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const review: Review = req.body;
  const userId = getIdFromToken(req);
  const id: string = req.params.id;
  review.id = id;
  review.userId = userId;
  if (
    !review.id ||
    !review.userId ||
    !review.rating ||
    !review.comment ||
    review.rating < 1 ||
    review.rating > 5
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const reviewService = new ReviewService();
  const response: Res<null> = await reviewService.updateReview(review);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const reviewService = new ReviewService();
  const response: Res<null> = await reviewService.deleteReview(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
