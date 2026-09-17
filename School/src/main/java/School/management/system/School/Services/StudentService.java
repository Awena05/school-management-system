package School.management.system.School.Services;

import School.management.system.School.Model.Student;
import School.management.system.School.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setAdmissionNo(student.getAdmissionNo());
        existingStudent.setFullName(student.getFullName());
        existingStudent.setClassName(student.getClassName());
        existingStudent.setGender(student.getGender());
        existingStudent.setDateOfBirth(student.getDateOfBirth());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setStatus(student.getStatus());

        return studentRepository.save(existingStudent);
    }
}