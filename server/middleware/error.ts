import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err:any , req: Request, res: Response , next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message  = err.messgae || 'Internal server error';

  // wrong mongodb id err
  if(err.name === 'CastError'){
    const message = `Resource not found. INvalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //DUplicate key error
  if (err.statusCode === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong jwr token
  if (err.name === 'JsoneWebTokenError'){
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if(err.name === 'TokenExpiredError'){
    const message = `Json web token is expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success:false,
    message:err.message
  })
}