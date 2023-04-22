import { Request, Response, NextFunction } from "express";
import {AnyZodObject} from "zod";

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) =>{
  try{
    schema.parse({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      surname: req.body.surname,
      identity_document: req.body.identity_document,
      verified: req.body.verified,
      dob: new Date(req.body.dob),
      verification_code: req.body.verification_code,
      password_reset_code: req.body.password_reset_code,
      disabled: req.body.disabled,
    });
    next()
  }catch(e: any){
    console.log(req.body)
    return res.status(400).send(e+"\n something wrong with schema")
  }
};


export default validateResource;