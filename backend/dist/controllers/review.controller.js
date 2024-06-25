"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewsByEventId = exports.getReviewsByUserId = exports.getReviews = exports.createReview = void 0;
const review_service_1 = require("../services/review.service");
const uuid_1 = require("uuid");
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewService = new review_service_1.ReviewService();
    const review = req.body;
    review.id = (0, uuid_1.v4)();
    review.userId = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!review.id ||
        !review.eventId ||
        !review.userId ||
        !review.rating ||
        !review.comment ||
        review.rating < 1 ||
        review.rating > 5) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const response = yield reviewService.createReview(review);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createReview = createReview;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewService = new review_service_1.ReviewService();
    const response = yield reviewService.getAllReviews();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getReviews = getReviews;
const getReviewsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewService = new review_service_1.ReviewService();
    const userId = req.params.userId;
    const response = yield reviewService.getReviewsByUserId(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getReviewsByUserId = getReviewsByUserId;
const getReviewsByEventId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewService = new review_service_1.ReviewService();
    const eventId = req.params.eventId;
    const response = yield reviewService.getReviewsByEventId(eventId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getReviewsByEventId = getReviewsByEventId;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    const userId = (0, get_id_from_token_1.getIdFromToken)(req);
    const id = req.params.id;
    review.id = id;
    review.userId = userId;
    if (!review.id ||
        !review.userId ||
        !review.rating ||
        !review.comment ||
        review.rating < 1 ||
        review.rating > 5) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const reviewService = new review_service_1.ReviewService();
    const response = yield reviewService.updateReview(review);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const reviewService = new review_service_1.ReviewService();
    const response = yield reviewService.deleteReview(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.deleteReview = deleteReview;
