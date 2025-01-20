import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function validate(schema: any, source: "body" | "query" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source]; // Lấy dữ liệu từ req.query, req.body, hoặc req.params
    try {
      const parsedData = schema.parse(data); // Kiểm tra và parse dữ liệu theo schema của zod

      // Cast kiểu dữ liệu đã được xác thực
      if (source === "query") {
        req.query = parsedData as any; // Cast kiểu dữ liệu `req.query`
      }

      next(); // Nếu không có lỗi thì gọi next() để tiếp tục
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        next(err);
      }
    }
  };
}
