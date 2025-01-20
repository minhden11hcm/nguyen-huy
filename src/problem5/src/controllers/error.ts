import { Request, Response } from "express";

const ErrorController = {
  get404: (req: Request, res: Response) => {
    res.status(404).json({ message: "Path not found" });
  },
};

export default ErrorController;
