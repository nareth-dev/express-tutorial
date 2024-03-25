import { movieModel } from "../database/models/movie";
import { BaseCustomError } from "../middlewares/BaseCustomError";
import { NextFunction, Request, Response } from "express";
//import v1 from "uuid";
export const movieController = {
  getById: async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const Usermovie = await movieModel.findById(req.params.movieId);
      if (!Usermovie) {
        throw new Error("Movie not found");
      }
       res.json({
        status: "success",
        message: "Movie found!!!",
        data: Usermovie,
      });
    } catch (err: any) {
      const customError = new BaseCustomError(err.message, 404);
      _next(customError);
    }
  },

  getAll: async function (req: Request, res: Response) {
    try {
      const movies = await movieModel.find({});
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

  updateById: async function (req: Request, res: Response) {
    try {
      const m = await movieModel.findByIdAndUpdate(req.params.movieId, {
        name: req.body.name,
      });
      if (!m) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: m,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  deleteById: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const deletedMovie = await movieModel.findByIdAndDelete(
        req.params.movieId
      );
      if (!deletedMovie) {
        throw next(new Error("Movie not found"));
      }
      res.json({
        status: "success",
        message: "Movie deleted successfully!!!",
        data: null,
      });
    } catch (error) {
      next(new Error("External server error"));
    }
  },

  create: async function (req: Request, res: Response) {
    try {
      const m = await new movieModel({
        name: req.body.name,
        released_on: req.body.released_on,
      }).save();
      res.status(200).json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
};
