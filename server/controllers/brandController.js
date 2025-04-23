import { Brand } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BrandController {
  async create(request, response) {
    const { name } = request.body;
    const brand = await Brand.create({ name });
    return response.json(brand);
  }

  async getAll(request, response) {
    const brands = await Brand.findAll();
    return response.json(brands);
  }
}

export default new BrandController();
