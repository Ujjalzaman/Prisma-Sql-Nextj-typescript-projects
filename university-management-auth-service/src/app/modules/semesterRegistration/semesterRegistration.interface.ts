export type ISemisterRegitrationFilterRequest = {
    searchTerm?: string;
    id?: string
}

export type IEnrolledCoursePayload = {
    offeredCourseSectionId: string,
    offerCourseId: string
}