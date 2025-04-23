import { Type } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController {
  async create(request, response, next) {
    try {
      if (!request.body) {
        return next(ApiError.badRequest("Request body is missing"));
      }
      const { name } = request.body;
      if (!name) {
        return next(ApiError.badRequest("Type name is required"));
      }
      const existingType = await Type.findOne({ where: { name } });
      if (existingType) {
        return next(ApiError.badRequest("Type with this name already exists"));
      }
      const type = await Type.create({ name });
      return response.json(type);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(request, response, next) {
    try {
      const types = await Type.findAll();
      return response.json(types);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

export default new TypeController();