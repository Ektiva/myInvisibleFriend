import { Photo } from './photo';
import { Chat } from './chat';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: any; // So it can accept either date or string
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
    likes?: User;
    lastname: string;
    avatar: string; 
    company: string; 
    jobtitle: string;
    email: string;
    phone: string; 
    address: string; 
    notes: string;
    status: string;
    mood: string;
    dateOfBirth: Date;
    size: number;
    pound: number;
    feet: number;
    smoke: string;
    drink: string;
}
export interface User1 {
    id: number;
    username: string;
    knownAs: string;
    dateOfBirth: Date;
    gender: string;
    created: Date;
    lastActive: any; // So it can accept either date or string
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
    likes?: User;
    lastname: string;
    avatar: string; 
    company: string; 
    jobtitle: string;
    email: string;
    phone: string; 
    address: string; 
    notes: string;
    status: string;
    mood: string;
    size: number;
    pound: number;
    feet: number;
    smoke: string;
    drink: string;
}
export interface Userr {
    id: number;
    name: string;
    mood: string;
    status: string;
    avatar: string;
    chatList: Chat[];
}
