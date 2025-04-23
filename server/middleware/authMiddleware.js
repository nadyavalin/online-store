import jwt from "jsonwebtoken";

export default function (request, response, next) {
  if (request.method === "OPTIONS") {
    next();
  }
  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      return response.status(401).json({ message: "User is not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    request.user = decoded;
    next();
  } catch (e) {
    console.error("Auth middleware error:", e.message);
    response.status(401).json({ message: "User is not authorized" });
  }
}
