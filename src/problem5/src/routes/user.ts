import express from "express";
import UserController from "../controllers/user";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  filterUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "../model/user";

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of users
 *     description: Fetch a paginated list of users, optionally filtered by name.\
 *     tags:
 *      - user
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Name to filter users by (optional).
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: perPage
 *         required: true
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *
 *     responses:
 *       200:
 *         description: A list of users with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 perPage:
 *                   type: integer
 *                   description: Number of items per page
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of items
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User's unique ID
 *                       name:
 *                         type: string
 *                         description: User's name
 *                       email:
 *                         type: string
 *                         description: User's email
 *                       age:
 *                         type: integer
 *                         description: User's age
 *                       phone:
 *                         type: string
 *                         description: User's phone number
 *                       address:
 *                         type: string
 *                         description: User's address
 *       500:
 *         description: Server error
 */
router.get("/", validate(filterUserSchema, "query"), UserController.getUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         age:
 *           type: integer
 *           description: The user's age
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         address:
 *           type: string
 *           description: The user's address
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         age: 30
 *         phone: "1234567890"
 *         address: "1234 Main St"
 *
 *     UserResponse:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         age:
 *           type: integer
 *           description: The user's age
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         address:
 *           type: string
 *           description: The user's address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         age: 30
 *         phone: "1234567890"
 *         address: "1234 Main St"
 *         createdAt: "2025-01-20T09:00:00.000Z"
 *         updatedAt: "2025-01-20T09:00:00.000Z"
 *
 * /user:
 *   post:
 *     summary: Create new user
 *     tags:
 *      - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: object
 *               example:
 *                 message: Validation Error
 *                 errors:
 *                   name: Name is required
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Email already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Server error
 */
router.post("/", validate(createUserSchema, "body"), UserController.createUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Retrieve the details of a specific user by their unique ID.
 *     tags:
 *      - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         description: The unique identifier of the user (MongoDB ObjectId format)
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "63c9f3dffb7b8b43168c9123"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 age:
 *                   type: number
 *                   example: 30
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 address:
 *                   type: string
 *                   example: "123 Example Street, Example City"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:34:56Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:34:56Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: object
 *               example:
 *                 message: Validation Error
 *                 errors:
 *                   name: Name is required
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Server error
 */
router.get(
  "/:id",
  validate(getUserByIdSchema, "params"),
  UserController.getUserById
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user's details
 *     description: Update the details of an existing user by their unique ID.
 *     tags:
 *      - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         description: The unique identifier of the user (MongoDB ObjectId format).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               age:
 *                 type: number
 *                 example: 28
 *               phone:
 *                 type: string
 *                 example: "+9876543210"
 *               address:
 *                 type: string
 *                 example: "456 Another Street, Another City"
 *
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "63c9f3dffb7b8b43168c9123"
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 email:
 *                   type: string
 *                   example: "jane.doe@example.com"
 *                 age:
 *                   type: number
 *                   example: 28
 *                 phone:
 *                   type: string
 *                   example: "+9876543210"
 *                 address:
 *                   type: string
 *                   example: "456 Another Street, Another City"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:34:56Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:45:00Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: object
 *               example:
 *                 message: Validation Error
 *                 errors:
 *                   name: Name is required
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Server error
 */
router.put(
  "/:id",
  validate(getUserByIdSchema, "params"),
  validate(updateUserSchema, "body"),
  UserController.updateUser
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete an existing user by their unique ID.
 *     tags:
 *      - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         description: The unique identifier of the user (MongoDB ObjectId format)
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "63c9f3dffb7b8b43168c9123"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 age:
 *                   type: number
 *                   example: 30
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 address:
 *                   type: string
 *                   example: "123 Example Street, Example City"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:34:56Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T12:34:56Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: object
 *               example:
 *                 message: Validation Error
 *                 errors:
 *                   name: Name is required
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Server error
 */
router.delete(
  "/:id",
  validate(getUserByIdSchema, "params"),
  UserController.deleteUser
);

export default router;
