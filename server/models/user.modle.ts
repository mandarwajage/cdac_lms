import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from 'bcryptjs';

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
