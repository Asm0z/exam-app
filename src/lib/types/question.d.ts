export interface QuestionsData {
    message:   string;
    questions: Question[];
}

export interface Question {
    _id:       string;
    question:  string;
    answers:   Answer[];
    type:      Type;
    correct:   Correct;
    subject:   null;
    exam:      Exam;
    createdAt: Date;
}

export interface Answer {
    answer: string;
    key:    Correct;
}

export enum Correct {
    A1 = "A1",
    A2 = "A2",
    A3 = "A3",
    A4 = "A4",
}

export interface Exam {
    _id:               ID;
    title:             Title;
    duration:          number;
    subject:           Subject;
    numberOfQuestions: number;
    active:            boolean;
    createdAt:         Date;
}

export enum ID {
    The6700707030A3C3C1944A9C5D = "6700707030a3c3c1944a9c5d",
}

export enum Subject {
    The670039C3728C92B7Fdf43506 = "670039c3728c92b7fdf43506",
}

export enum Title {
    JavaScriptQuiz = "JavaScript Quiz",
}

export enum Type {
    SingleChoice = "single_choice",
}
