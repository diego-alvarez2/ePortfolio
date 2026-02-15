import { Document } from "mongoose";

export interface User { // Definition of User
    
    // We don't have any Id defined because is coming from mongodb "Document" 
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}

export interface UserDocument extends User, Document {
    validatePassword(param1: string): string
} // New interface for UserDocument