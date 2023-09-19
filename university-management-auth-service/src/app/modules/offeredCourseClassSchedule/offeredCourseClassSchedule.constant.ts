export const offeredCourseClassScheduleSearchableFields = ['dayOfWeek'];

export const offeredCourseClassScheduleRelationFields = [
    'semesterRegistrationId',
    'offeredCourseSectionId',
    'facultyId',
    'roomId'
]

export const offeredCourseClassScheduleRelationFieldsMapper: {[key: string]: string}= {
    semesterRegistrationId : 'SemesterRegistration',
    offeredCourseSectionId : 'OfferedCourseSection',
    facultyId : 'faculty',
    roomId : 'room'
}

export const offeredCourseClassScheduleFilterableFields = [
    'searchTerm',
    'dayOfWeek',
    'semesterRegistrationId',
    'offeredCourseSectionId',
    'facultyId',
    'roomId'
]