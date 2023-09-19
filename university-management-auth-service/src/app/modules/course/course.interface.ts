export type ICourse = {
    title: string,
    code: string,
    credits: string,
    preRequisiteCourses: IPrerequisiteCourseRequest[]
}

export type IPrerequisiteCourseRequest = {
    courseId: string,
    isDeleted?: null
}

export type ICourseFilterRequest = {
    searchTerm?: string | undefined;
}