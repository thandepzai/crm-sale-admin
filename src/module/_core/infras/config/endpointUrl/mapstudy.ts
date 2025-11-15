import { cleanObject } from "lib/util/functions";

const BASE_URL = process.env.mapStudyHost;

export class MapstudyEndpoint {
    static base = BASE_URL;
    static baseAdmin = BASE_URL + "/admin";

    // constructor(baseUrl: string) {
    //     this.base = baseUrl;
    //     this.baseAdmin = baseUrl + "/admin";
    // }

    static extractQuery = (query: object) => {
        const queryString = Object.entries(cleanObject(query, [undefined, ""]))
            .map(([key, value]) => key + "=" + value)
            .join("&");

        return queryString;
    };

    // // Common
    // getCities = () => `${this.base}/v1/city`;
    // getSchools = () => `${this.base}/v1/school`;
    // getTags = () => `${this.base}/v1/tag`;
    // getExtraData = () => `${this.baseAdmin}/v1/extra-data`;

    // // Auth
    // auth = () => `${this.baseAdmin}/v1/auth/me`;
    // login = () => `${this.baseAdmin}/v1/login`;
    // refreshToken = () => `${this.baseAdmin}/v1/refresh-token`;
    // logout = () => `${this.baseAdmin}/v1/logout`;

    // // Auth/Role
    // getRoles = () => `${this.baseAdmin}/v1/role`;
    // createRole = () => `${this.baseAdmin}/v1/role`;
    // getOneRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;
    // updateRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;
    // deleteRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;

    // // Auth/Permission
    // getPermissions = () => `${this.baseAdmin}/v1/permission`;
    // createPermission = () => `${this.baseAdmin}/v1/permission`;
    // updatePermission = (permissionId: number) => `${this.baseAdmin}/v1/permission/${permissionId}`;
    // deletePermission = (permissionId: number) => `${this.baseAdmin}/v1/permission/${permissionId}`;

    // // User
    // getUsers = (filter: UserFilterDTO) => `${this.baseAdmin}/v1/user?${this.extractQuery(filter)}`;
    // createUser = () => `${this.baseAdmin}/v1/user`;
    // getOneUser = (userId: number) => `${this.baseAdmin}/v1/user/${userId}`;
    // updateOneUser = (userId: number) => `${this.baseAdmin}/v1/user/${userId}`;
    // deleteOneUser = (userId: number) => `${this.baseAdmin}/v1/user/${userId}`;

    // // Teacher
    // getTeachers = () => `${this.baseAdmin}/v1/teacher`;
    // createTeacher = () => `${this.baseAdmin}/v1/teacher`;
    // getOneTeacher = (teacherId: number) => `${this.baseAdmin}/v1/teacher/${teacherId}`;
    // updateOneTeacher = (teacherId: number) => `${this.baseAdmin}/v1/teacher/${teacherId}`;
    // deleteOneTeacher = (teacherId: number) => `${this.baseAdmin}/v1/teacher/${teacherId}`;

    // // Course
    // getCourses = (filter: CourseFilterDTO) => `${this.baseAdmin}/v1/course?${this.extractQuery(filter)}`;
    // createCourse = () => `${this.baseAdmin}/v1/course`;
    // getOneCourse = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}`;
    // updateOneCourse = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}`;
    // deleteOneCourse = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}`;

    // // Course/UserInCourse
    // getUsersInCourse = (courseId: number, filter: UserInCourseFilterDTO) =>
    //     `${this.baseAdmin}/v1/course/${courseId}/user?${this.extractQuery(filter)}`;
    // addUsersToCourse = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}/user/add-to-course`;
    // removeUsersFromCourse = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}/user/remove-from-course`;

    // // Course/Section
    // getSections = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}/section`;
    // createSection = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}/section`;
    // getOneSection = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}`;
    // updateOneSection = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}`;
    // deleteOneSection = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}`;
    // updateSectionOrders = (courseId: number) => `${this.baseAdmin}/v1/course/${courseId}/section/change-order`;

    // // Course/Lesson
    // getLessons = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}/lesson`;
    // createLesson = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}/lesson`;
    // getOneLesson = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}`;
    // updateOneLesson = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}`;
    // deleteOneLesson = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}`;
    // updateLessonOrders = (sectionId: number) => `${this.baseAdmin}/v1/course/_/section/${sectionId}/lesson/change-order`;

    // // Course/LessonVideo
    // // getLessonVideos = (lessonId: string) => `${this.baseAdmin}/course/_/section/_/lesson/${lessonId}/video`;
    // createLessonVideo = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/video`;
    // updateLessonVideoOrders = (lessonId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/video/change-order`;
    // updateOneLessonVideo = (lessonVideoId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/_/video/${lessonVideoId}`;
    // deleteOneLessonVideo = (lessonVideoId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/_/video/${lessonVideoId}`;

    // // Course/LessonDocument
    // createLessonDocument = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/document`;
    // updateLessonDocumentOrders = (lessonId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/document/change-order`;
    // updateOneLessonDocument = (documentId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/_/document/${documentId}`;
    // deleteOneLessonDocument = (documentId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/_/document/${documentId}`;

    // // Course/LessonTest
    // createLessonTest = (lessonId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/test`;
    // updateLessonTestOrders = (lessonId: number) =>
    //     `${this.baseAdmin}/v1/course/_/section/_/lesson/${lessonId}/test/change-order`;
    // updateOneLessonTest = (testId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/_/test/${testId}`;
    // deleteOneLessonTest = (testId: number) => `${this.baseAdmin}/v1/course/_/section/_/lesson/_/test/${testId}`;

    // // Category
    // getCategories = (filter: CategoryFilterDTO) => `${this.baseAdmin}/v1/category?${this.extractQuery(filter)}`;
    // createCategory = () => `${this.baseAdmin}/v1/category`;
    // getOneCategory = (categoryId: number) => `${this.baseAdmin}/v1/category/${categoryId}`;
    // updateOneCategory = (categoryId: number) => `${this.baseAdmin}/v1/category/${categoryId}`;
    // deleteOneCategory = (categoryId: number) => `${this.baseAdmin}/v1/category/${categoryId}`;

    // // Order/Campaign
    // getCampaigns = (filter: CampaignFilterDTO) => `${this.baseAdmin}/v1/campaign?${this.extractQuery(filter)}`;
    // getOneCampaign = (campaignId: number) => `${this.baseAdmin}/v1/campaign/${campaignId}`;
    // createCampaignWithCodes = () => `${this.baseAdmin}/v1/campaign/create-with-multiple-code`;
    // updateOneCampaign = (campaignId: number) => `${this.baseAdmin}/v1/campaign/${campaignId}`;
    // // deleteOneCampaign = (campaignId: number) => `${this.baseAdmin}/v1/campaign/${campaignId}`;

    // // Order/ActivationCode
    // searchActivationCodes = (filter: ActivationCodeFilterDTO) =>
    //     `${this.baseAdmin}/v1/campaign/_/activation-code?${this.extractQuery(filter)}`;
    // getActivationCodes = (campaignId: number, filter: ActivationCodeFilterDTO) =>
    //     `${this.baseAdmin}/v1/campaign/${campaignId}/activation-code?${this.extractQuery(filter)}`;
    // updateOneActivationCode = (activationCodeId: number) =>
    //     `${this.baseAdmin}/v1/campaign/_/activation-code/${activationCodeId}`;
    // deleteOneActivationCode = (activationCodeId: number) =>
    //     `${this.baseAdmin}/v1/campaign/_/activation-code/${activationCodeId}`;

    // // HomeSlider
    // getHomeSliders = (filter: HomeSliderFilterDTO) => `${this.baseAdmin}/v1/home-slider?${this.extractQuery(filter)}`;
    // createHomeSlider = () => `${this.baseAdmin}/v1/home-slider`;
    // getOneHomeSlider = (homeSliderId: number) => `${this.baseAdmin}/v1/home-slider/${homeSliderId}`;
    // updateOneHomeSlider = (homeSliderId: number) => `${this.baseAdmin}/v1/home-slider/${homeSliderId}`;
    // deleteOneHomeSlider = (homeSliderId: number) => `${this.baseAdmin}/v1/home-slider/${homeSliderId}`;

    // // Test
    // getTests = (filter: TestFilterDTO) => `${this.baseAdmin}/v1/test?${this.extractQuery(filter)}`;
    // createTest = () => `${this.baseAdmin}/v1/test`;
    // getOneTest = (testId: number) => `${this.baseAdmin}/v1/test/${testId}`;
    // updateOneTest = (testId: number) => `${this.baseAdmin}/v1/test/${testId}`;
    // deleteOneTest = (testId: number) => `${this.baseAdmin}/v1/test/${testId}`;

    // // Test/Video
    // createTestVideo = (testId: number) => `${this.baseAdmin}/v1/test/${testId}/video`;
    // updateTestVideoOrders = (testId: number) => `${this.baseAdmin}/v1/test/${testId}/video/change-order`;
    // updateOneTestVideo = (testVideoId: number) => `${this.baseAdmin}/v1/test/_/video/${testVideoId}`;
    // deleteOneTestVideo = (testVideoId: number) => `${this.baseAdmin}/v1/test/_/video/${testVideoId}`;
}

// export const mapStudyApi = new MapStudyApi(BASE_URL as string);
