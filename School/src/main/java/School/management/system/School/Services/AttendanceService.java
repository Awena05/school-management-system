package School.management.system.School.Services;

import School.management.system.School.Model.Attendance;
import School.management.system.School.Repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    // Add Attendance
    public Attendance addAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    // Get All Attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Get Attendance By ID
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    // Update Attendance
    public Attendance updateAttendance(Long id, Attendance attendance) {

        Attendance existingAttendance =
                attendanceRepository.findById(id).orElse(null);

        if (existingAttendance != null) {

            existingAttendance.setAdmissionNo(
                    attendance.getAdmissionNo()
            );

            existingAttendance.setStudentName(
                    attendance.getStudentName()
            );

            existingAttendance.setClassName(
                    attendance.getClassName()
            );

            existingAttendance.setDate(
                    attendance.getDate()
            );

            existingAttendance.setStatus(
                    attendance.getStatus()
            );

            return attendanceRepository.save(existingAttendance);
        }

        return null;
    }

    // Delete Attendance
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
}