import { SubjectProfessor } from "../subjects/subject_professor.model";
import { User } from "../users/user.model";

export class AssignmentFK {
    _id?: string;
    nom! : string;
    student_id! : string;
    subject_id! : string;
    note! : string;
    remarque! : string;
    dateDeRendu! : Date|string;
    rendu! : boolean;
    student! : User;
    subject! : SubjectProfessor;
}