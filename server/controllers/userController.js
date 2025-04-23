import ApiError from "../error/ApiError.js";

class UserController {
  async registration(request, response) {}

  async login(request, response) {}

  async check(request, response, next) {
    const { id } = request.query;
    if (!id) {
      return next(ApiError.badRequest("ID was not set"));
    }
    response.json(id);
  }
}

export default new UserController();
