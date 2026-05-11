import InputForm from "@/components/core/InputPassword";
import Select from "@/components/core/Select";
import { useFetchData } from "@/hooks/useBaseQuery";
import { classService, schoolService, studentService } from "@/services";
import {
  ChevronLeft,
  GraduationCap,
  School as SchoolIcon,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { SubmitEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../components/core/popups/PopUp";
import PartCard from "../components/PartCard";
import { MOCK_LEVELS } from "../data/mockData";
import { toast } from "../hooks/use-toast";

interface FormData {
  studentId: string | number;
  studentName: string;
  classId: string | number;
  className: string;
  schoolId: string | number;
  schoolName: string | null;
  password: string;
}

export default function PartsPage() {
  const { levelId } = useParams();
  const level = MOCK_LEVELS.find((l) => l.id === levelId);

  const [showPopup, setShowPopup] = useState(false);
  const [choosePart, setChoosePart] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    studentName: "",
    classId: "",
    className: "",
    schoolId: "",
    schoolName: "",
    password: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectOpenClass, setIsSelectOpenClass] = useState(false);
  const [isSelectOpenStudent, setIsSelectOpenStudent] = useState(false);
  const navigate = useNavigate();

  // Call API
  const { data: schools, isLoading } = useFetchData<any>(["schools"], () =>
    schoolService.getAll(),
  );

  // Call API
  const { data: classes, isLoading: isLoadingClass } = useFetchData<any>(
    ["classes", formData.schoolId],
    () => classService.getClassBySchoolId(formData.schoolId),
    {
      enabled: !!formData.schoolId, // Condition
    },
  );

  // Call API
  const { data: students, isLoading: isLoadingStudent } = useFetchData<any>(
    ["classes", formData.classId],
    () => studentService.getStudentByClassId(formData.classId),
    {
      enabled: !!formData.classId, // Condition
    },
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== "OT626") {
      toast({ title: "Password is incorrect", variant: "destructive" });
      return;
    }

    localStorage.clear();
    const studentInfo = {
      studentId: formData.studentId,
      studentName: formData.studentName,
      classId: formData.classId,
      className: formData.className,
      schoolName: formData.schoolName
    };

    localStorage.setItem("student", JSON.stringify(studentInfo));
    navigate(
      `/quiz/${levelId}/${choosePart}?time=${MOCK_LEVELS.find((l) => l.id === levelId)?.parts.find((p) => p.id === choosePart)?.duration}`,
    );
  };

  if (!level) return <div>Level not found</div>;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 max-w-5xl mx-auto px-4 pt-6"
    >
      <header className="space-y-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <button className="w-8 h-8 rounded-lg bg-[#1e1810] border border-[#2e2418] flex items-center justify-center hover:bg-[#2a2018] transition-colors">
            <ChevronLeft size={15} className="text-[#c8a46e]" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white leading-tight underline">
              Back Button
            </h1>
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl font-display font-bold">Chọn phần thi</h2>
          <p className="text-slate-400">Chọn phần thi để bắt đầu làm bài</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {level.parts.map((part, index) => (
          <PartCard
            key={part.id}
            part={part}
            setShowPopup={() => setShowPopup(true)}
            setChoosePart={setChoosePart}
            index={index}
          />
        ))}
      </div>
      {showPopup && (
        <PopUp
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          className="max-h-[85vh]"
        >
          <div className="text-center space-x-2">
            <h3 className="text-2xl  md:font-display font-bold">
              Thông tin thí sinh
            </h3>
            <p className="text-sm text-slate-400">
              Vui lòng cung cấp thông tin để bắt đầu bài thi
            </p>
          </div>

          <form className="" onSubmit={(e) => handleSubmit(e)}>
            {/* Shool select */}
            <Select
              key={"schools"}
              label="School"
              heightOption="xl:max-h-60 max-h-44"
              placeholder="Choose your school"
              data={schools?.data || []}
              value={formData.schoolId}
              isOpen={isSelectOpen}
              setIsOpen={setIsSelectOpen}
              isLoading={isLoading}
              icon={<SchoolIcon size={18} />}
              onChange={(school) => {
                setFormData({
                  ...formData,
                  schoolId: school.id,
                  schoolName: school.name,
                });
              }}
            />

            {/* Class select */}
            <Select
              key={"classes"}
              label="Class"
              placeholder="Choose your class"
              heightOption="xl:max-h-60 max-h-44"
              data={classes?.data || []}
              value={formData.classId}
              isLoading={isLoadingClass}
              isOpen={isSelectOpenClass}
              setIsOpen={setIsSelectOpenClass}
              icon={<GraduationCap size={18} />}
              onChange={(classroom) => {
                setFormData({
                  ...formData,
                  classId: classroom.id,
                  className: classroom.name,
                });
              }}
            />

            {/* Student select */}
            <Select
              key={"students"}
              label="Name"
              placeholder="Choose your name"
              data={students?.data || []}
              value={formData.studentId}
              isLoading={isLoadingStudent}
              isOpen={isSelectOpenStudent}
              setIsOpen={setIsSelectOpenStudent}
              icon={<User size={18} />}
              onChange={(student) => {
                setFormData({
                  ...formData,
                  studentId: student.id,
                  studentName: student.name,
                });
              }}
            />

            {/* Password Field */}
            <InputForm
              label="Mật khẩu bài thi"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <button className="w-full lg:py-4 py-3 bg-devotion-gold text-devotion-bg rounded-2xl font-bold lg:mt-8 mt-4  hover:bg-amber-400 transition-colors">
              Bắt đầu làm bài
            </button>
          </form>
        </PopUp>
      )}
    </motion.div>
  );
}
