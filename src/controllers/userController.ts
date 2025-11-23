import * as userService from "../services/userService"; 
import { Request, Response } from "express"; 
export async function register(req: Request, res: Response) { 
try { 
const result = await userService.register(req.body); 
return res.status(201).json(result); 
} catch (error: any) { 
return res.status(400).json({ error: error.message }); 
} 
} 
export async function login(req: Request, res: Response) { 
try { 
const { email, password } = req.body; 
const result = await userService.login(email, password); 
return res.status(200).json(result); 
} catch (error: any) { 
return res.status(401).json({ error: error.message }); 
} 
} 