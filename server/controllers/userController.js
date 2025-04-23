import ApiError from "../error/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Basket } from "../models/models.js";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email: email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(request, response, next) {
    const { email, password, role } = request.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect password or email"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with this email already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return response.json({ token });
  }

  async login(request, response, next) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User with this name not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Incorrect password entered"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return response.json({ token });
  }

  async check(request, response, next) {
    const token = generateJwt(
      request.user.id,
      request.user.email,
      request.user.role
    );
    return response.json({ token });
  }
}

export default new UserController();
