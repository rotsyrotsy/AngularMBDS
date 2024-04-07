import { User } from "../users/user.model";

export class SubjectProfessor {
    _id?: string;
    name? : string;
    picture! : string;
    professor_id! : string;
    professor? : User;
}