import { Request, Response } from "express";
import { userModel } from "../database/models/user_model";
import user_service from "../services/user_service";
export const userController = {
  create: async function (req: Request, res: Response) {
    try {
      const requestData = req.body;
      const UserService = new user_service();
      const { newUser, token } = await UserService.signUp(requestData);
      res.status(201).json({
        status: "success",
        message: "User added successfully!!!",
        data: { newUser, token },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
  
  getAll: async function (req: Request, res: Response) {
    try {
      const movies = await userModel.find({});
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: movies,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

};
export default userController;



