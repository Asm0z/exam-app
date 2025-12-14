
export interface SubjectsData {
    message:  string;
    metadata: Metadata;
    subjects: Subject[];
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}

export interface Subject {
    _id:       string;
    name:      string;
    icon:      string;
    createdAt: Date;
}


