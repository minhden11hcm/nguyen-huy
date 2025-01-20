import { Request, Response } from "express";
import User, { IFilterUserQuery, IUser } from "../model/user";

const UserController = {
  getUser: (req: Request, res: Response) => {
    const { name, page, perPage } = req.query as unknown as IFilterUserQuery;
    const skip = (page - 1) * perPage;
    const limit = perPage;
    const query = name ? { name: new RegExp(name as string, "i") } : {};
    User.find(query)
      .skip(skip)
      .limit(limit)
      .then((users) => {
        User.countDocuments(query).then((count) => {
          res.status(200).json({
            page: page,
            perPage: limit,
            totalItems: count,
            users,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error", err });
      });
  },

  getUserById: (req: Request, res: Response) => {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error", err });
      });
  },

  createUser: (req: Request, res: Response) => {
    const { name, email, age, phone, address } = req.body as IUser;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, age, phone, address });
        return newUser.save();
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error", err });
      });
  },

  updateUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, email, age, phone, address } = req.body as Partial<IUser>;

    try {
      if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: id } });
        if (existingUser) {
          res.status(409).json({ message: "Email already exists" });
        }
      }

      // Tiến hành cập nhật user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, age, phone, address },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  deleteUser: (req: Request, res: Response) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error", err });
      });
  },
};

export default UserController;
