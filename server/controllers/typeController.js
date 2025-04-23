import { Type } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController {
  async create(request, response) {
    const { name } = request.body;
    const type = await Type.create({ name });
    return response.json(type);
  }

  async getAll(request, response) {
    const types = await Type.findAll();
    return response.json(types);
  }
}

export default new TypeController();
