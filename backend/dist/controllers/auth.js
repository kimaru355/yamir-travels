"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword =
  exports.updateDetails =
  exports.login =
  exports.register =
    void 0;
const uuid_1 = require("uuid");
const auth_1 = require("../services/auth");
const get_id_from_token_1 = require("../middlewares/get_id_from_token");
const register = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.AuthService();
    const user_register = req.body;
    user_register.id = (0, uuid_1.v4)();
    const response = yield auth.register(user_register);
    if (response.success) {
      return res.status(201).json(response);
    } else if (response.message === "An error occurred") {
      return res.status(200).json(response);
    } else {
      return res.status(200).json(response);
    }
  });
exports.register = register;
const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.AuthService();
    const user_login = req.body;
    const response = yield auth.login(user_login);
    if (response.success) {
      return res.status(200).json(response);
    } else if (response.message === "An error occurred") {
      return res.status(200).json(response);
    } else {
      return res.status(200).json(response);
    }
  });
exports.login = login;
const updateDetails = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.AuthService();
    const id = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "Invalid or expired token",
        data: null,
      });
    }
    const user_details = req.body;
    user_details.id = id;
    const response = yield auth.updateDetails(user_details);
    if (response.success) {
      return res.status(200).json(response);
    } else if (response.message === "An error occurred") {
      return res.status(200).json(response);
    } else {
      return res.status(200).json(response);
    }
  });
exports.updateDetails = updateDetails;
const updatePassword = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.AuthService();
    const id = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "Invalid or expired token",
        data: null,
      });
    }
    const user_passwords = req.body;
    user_passwords.id = id;
    const response = yield auth.updatePassword(user_passwords);
    if (response.success) {
      return res.status(202).json(response);
    } else if (response.message === "An error occurred") {
      return res.status(200).json(response);
    } else {
      return res.status(200).json(response);
    }
  });
exports.updatePassword = updatePassword;
