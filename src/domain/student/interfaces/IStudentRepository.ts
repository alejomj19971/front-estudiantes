import type { StudentDashboardData, StudentProgress } from '../types'

export interface IStudentRepository {
  getDashboard(studentId: string): Promise<StudentDashboardData>
  getProgress(studentId: string): Promise<StudentProgress[]>
  markContentComplete(courseId: string, contentId: string): Promise<void>
}
