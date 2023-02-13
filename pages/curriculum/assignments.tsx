import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'components';
import { BsPlusCircle } from 'react-icons/bs';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
import { IoPersonAddOutline } from 'react-icons/io5';
import { TbMedal } from 'react-icons/tb';
import { StudentModal, SkillModal } from 'components/curriculum/assignment';

import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from 'store/studentSlice';
import SingleAssignment from '@/components/curriculum/assignment/singleAssignment';

import {
  SkillDetails,
  AssignmentDetails,
  AssignmentSkill,
  Student,
  DynamicChechbox,
  IMainAssignment,
} from 'types/interfaces';
import { addNewAssignments, getAssignments, updateAssignment } from 'services/assignmentService';
import { getDate } from 'utils/getDate';
import { useRouter } from 'next/router';
import TeacherLayout from '@/components/Teachers/TeacherLayout';

const Assignments = () => {
  const modalDefaults = {
    saveResponse: false,
    createResponse: false,
    cancelResponse: false,
    historyResponse: false,
    skillsResponse: false,
    studentResponse: false,
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalWrapperDisplay, setModalWrapperDisplay] = useState(false);
  const [modalItemsDisplay, setModalItemsDisplay] = useState(modalDefaults);
  const [historyType, setHistoryType] = useState('active');
  const [skillCheckbox, setSkillCheckbox] = useState<DynamicChechbox>({});
  const [studentCheckbox, setStudentCheckbox] = useState<DynamicChechbox>({});
  const [allStudentCheckbox, setAllStudentCheckbox] = useState({
    isChecked: false,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | string>('');
  const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
    title: '',
    order: 'random',
    number: 0,
    skills: [],
    students: [],
    start_date: getDate(),
    end_date: '',
    is_current: true,
  });

  const assingmentSkills = useSelector((state: RootState): SkillDetails[] => state.skills);
  const { assignments } = useSelector((state: RootState) => state.allAssignments);

  const { students } = useSelector((state: RootState) => state.students);

  const setEditAssignment = (assignment: any, id: string | number) => {
    setAssignmentDetails(assignment);

    setIsEditing(true);
    setEditId(id);
    setModalWrapperDisplay((prev) => false);
    setModalItemsDisplay((prev) => modalDefaults);
  };

  const resetAssignments = () => {
    setAssignmentDetails({
      title: '',
      order: 'random',
      number: 0,
      skills: [],
      students: [],
      start_date: getDate(),
      end_date: '',
      is_current: true,
    });
  };
  const addSkill = (newSkill: AssignmentSkill) => {
    setAssignmentDetails((prev) => {
      const prevSkills = prev.skills;
      return { ...prev, skills: [...prevSkills, newSkill] };
    });
  };
  const removeSkill = (newSkill: AssignmentSkill) => {
    setAssignmentDetails((prev) => {
      const prevSkills = prev.skills;
      const newSkills = prevSkills.filter((skill) => skill.skillId !== newSkill.skillId);
      return { ...prev, skills: newSkills };
    });
  };
  const addStudent = (newStudent: Student) => {
    setAssignmentDetails((prev) => {
      const prevStudents = prev.students;
      return { ...prev, students: [...prevStudents, newStudent] };
    });
  };
  const removeStudent = (newStudent: Student) => {
    setAssignmentDetails((prev) => {
      const prevStudents = prev.students;
      const newStudents = prevStudents.filter((student) => student.email !== newStudent.email);
      return { ...prev, students: newStudents };
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updateAssignmentSchedule = (value: boolean) => {
    setAssignmentDetails((prev) => {
      return { ...prev, is_current: value };
    });
  };
  const updateScheduleDate = (key: string, value: string) => {
    setAssignmentDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleSkillCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillCheckbox((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
    const value = e.target.checked;
    if (value) {
      addSkill({ skillId: e.target.name });
    } else {
      removeSkill({ skillId: e.target.name });
    }
  };
  const handleStudentCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    studentDetails: Student,
  ) => {
    setStudentCheckbox((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
    const value = e.target.checked;
    if (value) {
      addStudent(studentDetails);
    } else {
      removeStudent(studentDetails);
    }
  };
  const handleAllStudentChechbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllStudentCheckbox({
      isChecked: e.target.checked,
    });
    const value = e.target.checked;
    if (value) {
      setAssignmentDetails((prev) => {
        return { ...prev, students: students?.students };
      });
      const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
        return { ...prev, [student]: true };
      }, {});
      setStudentCheckbox(newCheckboxes);
    } else {
      setAssignmentDetails((prev) => {
        return { ...prev, students: [] };
      });
      const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
        return { ...prev, [student]: false };
      }, {});
      setStudentCheckbox(newCheckboxes);
    }
  };
  const showModal = (modalName: string) => {
    setModalWrapperDisplay((prev) => true);
    setModalItemsDisplay((prev) => ({ ...modalDefaults, [modalName]: true }));
  };
  const hideModal = () => {
    setModalWrapperDisplay((prev) => false);
    setModalItemsDisplay((prev) => modalDefaults);
  };
  const switchModal = (modalName: string) => {
    setModalItemsDisplay((prev) => (prev = { ...modalDefaults, [modalName]: true }));
  };
  useEffect(() => {
    assingmentSkills.forEach((skillCategory) => {
      skillCategory.tests.forEach((test) => {
        setSkillCheckbox((prev) => ({
          ...prev,
          [test.testId]: false,
        }));
      });
    });
    students?.students?.forEach((student) => {
      setStudentCheckbox((prev) => ({
        ...prev,
        [student.email]: false,
      }));
    });
  }, []);
  const fetchAllStudents = async () => {
    await dispatch(getStudents());
  };
  useEffect(() => {
    dispatch(getAssignments());
  }, []);
  useEffect(() => {
    setAssignmentDetails((prev) => ({ ...prev, number: 0 }));
  }, [assignmentDetails.skills]);
  useEffect(() => {
    fetchAllStudents();
  }, []);
  return (
    <>
      <TeacherLayout>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2 mb-6 text-[#2073fa]">
            <span
              className="text-[22px] font-bold cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <FaChevronLeft />
            </span>
            <h2 className="text-[28px] font-bold" data-testid="curriculum-assignment-heading">
              New Assignment
            </h2>
          </div>
          <div className="">
            <input
              type="text"
              name="title"
              id="assignmentTitle"
              className="h-[44px] w-[90vw] max-w-[400px] py-2 px-4 rounded-md outline-none"
              placeholder="Assignment Title"
              value={assignmentDetails.title}
              onChange={handleInputChange}
            />
            <div className="pt-4 mt-4 border-t border-[#BDBDBD] flex flex-col gap-4">
              <div className="rounded-md md:h-[58px] md:bg-white flex items-center overflow-y-hidden md:flex-row flex-col gap-y-2">
                <div className="md:rounded-r-md rounded-md bg-white flex items-center md:justify-between justify-center gap-4 px-4 w-full md:w-[180px] shadow-right h-full md:py-0 py-2 ">
                  <span className="font-bold">Skill(s)</span>
                  <span
                    className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"
                    onClick={() => {
                      showModal('skillsResponse');
                    }}
                  >
                    <TbMedal />{' '}
                  </span>
                </div>
                <div className="md:px-14 bg-white md:bg-transparent w-full md:text-start text-center md:py-0 py-2 md:justify-start rounded-md">
                  <span className="font-medium">
                    {assignmentDetails.skills?.length} skill
                    {assignmentDetails.skills?.length === 1 ? '' : '(s)'} selected
                  </span>{' '}
                  value
                </div>
              </div>
              <div className="rounded-md md:h-[58px] md:bg-white flex items-center overflow-y-hidden md:flex-row flex-col gap-y-2">
                <div className="md:rounded-r-md rounded-md bg-white flex items-center md:justify-between justify-center gap-4 px-4 w-full md:w-[180px] shadow-right h-full md:py-0 py-2 ">
                  <span className="font-bold">Student{'(s)'}</span>
                  <span
                    className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"
                    onClick={() => {
                      showModal('studentResponse');
                    }}
                  >
                    <IoPersonAddOutline />{' '}
                  </span>
                </div>
                <div className="md:px-14 bg-white md:bg-transparent w-full md:text-start text-center md:py-0 py-2 md:justify-start rounded-md">
                  <span className="font-medium">
                    {assignmentDetails.students?.length} student
                    {assignmentDetails.students?.length === 1 ? '' : '(s)'} selected
                  </span>
                </div>
              </div>
              <div className="rounded-md md:h-[58px] md:bg-white flex items-center md:flex-row flex-col gap-y-2">
                <div className=" md:rounded-r-md rounded-md bg-white flex items-center md:justify-between justify-center gap-4 px-4 w-full md:w-[180px] shadow-right h-full md:py-0 py-2">
                  <span className="font-bold">Scheduling</span>
                </div>
                <div className="md:px-14 bg-white md:bg-transparent w-full md:justify-start justify-center rounded-md px-6 md:py-0 py-4">
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap overflow-x-scroll">
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="schedule"
                        value="now"
                        checked={assignmentDetails.is_current}
                        onChange={() => {
                          updateScheduleDate('start_date', getDate());
                          updateAssignmentSchedule(true);
                        }}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="schedule"
                      >
                        Start Now
                      </label>
                    </div>
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="schedule"
                        value="later"
                        checked={!assignmentDetails.is_current}
                        onChange={() => updateAssignmentSchedule(false)}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="schedule"
                      >
                        Schedule for later
                      </label>
                    </div>

                    {!assignmentDetails.is_current && (
                      <div className="relative max-w-fit">
                        <input
                          type="date"
                          value={assignmentDetails.start_date}
                          className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-[#2073fa] text-[15px]"
                          onChange={(e) => {
                            updateScheduleDate('start_date', e.target.value);
                          }}
                        />
                        <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">
                          Start date
                        </div>
                      </div>
                    )}
                    <div className="relative max-w-fit">
                      <input
                        type="date"
                        value={assignmentDetails.end_date}
                        className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-[#2073fa] text-[15px]"
                        onChange={(e) => {
                          updateScheduleDate('end_date', e.target.value);
                        }}
                      />
                      <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">
                        End date
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md md:h-[58px] md:bg-white flex items-center overflow-y-hidden md:flex-row flex-col gap-y-2">
                  <div className="md:rounded-r-md rounded-md bg-white flex items-center md:justify-between justify-center gap-4 px-4 w-full md:w-[180px] shadow-right h-full md:py-0 py-2">
                    <span className="font-bold">No. of questions</span>
                  </div>
                  <div className="px-14 flex gap-8 items-center bg-white md:bg-transparent w-full md:text-start text-center md:py-0 py-2 rounded-md">
                    <input
                      type="range"
                      name="number"
                      min={0}
                      max={100}
                      value={assignmentDetails?.number}
                      // step={assignmentDetails?.skills?.length}
                      className="w-[380px] h-[12px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100 assignment-slider"
                      onChange={handleInputChange}
                    />
                    <div className="w-full">
                      <input
                        type="range"
                        name="number"
                        min={0}
                        max={100}
                        value={assignmentDetails?.number}
                        // step={assignmentDetails?.skills?.length}
                        className="w-[90%] md:w-[380px] h-[12px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100 assignment-slider"
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="order"
                      >
                        Random
                      </label>
                    </div>
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="order"
                        value="sequence"
                        checked={assignmentDetails.order === 'sequence'}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="order"
                      >
                        Sequence
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rounded-md md:h-[58px] md:bg-white flex items-center overflow-y-hidden md:flex-row flex-col gap-y-2">
                  <div className="md:rounded-r-md rounded-md bg-white flex items-center md:justify-between justify-center gap-4 px-4 w-full md:w-[180px] shadow-right h-full md:py-0 py-2 ">
                    <span className="font-bold">Order of questions</span>
                  </div>
                  <div className="px-14 flex items-center gap-8 md:px-14 bg-white md:bg-transparent w-full md:justify-start justify-center md:py-0 py-2 rounded-md">
                    <div className="flex items-center gap-14">
                      <div className="form-check flex items-center gap-2">
                        <input
                          className=""
                          type="radio"
                          name="order"
                          value="random"
                          checked={assignmentDetails.order === 'random'}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800 font-medium"
                          htmlFor="order"
                        >
                          Random
                        </label>
                      </div>
                      <div className="form-check flex items-center gap-2">
                        <input
                          className=""
                          type="radio"
                          name="order"
                          value="sequence"
                          checked={assignmentDetails.order === 'sequence'}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800 font-medium"
                          htmlFor="order"
                        >
                          Sequence
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-4 mt-4 flex-wrap w-full  md:justify-end justify-center">
                  <span
                    onClick={async () => {
                      if (!isEditing) {
                        await dispatch(
                          addNewAssignments({
                            assignment: assignmentDetails,
                            actionType: 'draft',
                            showModal,
                            modalType: 'saveResponse',
                            resetAssignments,
                          }),
                        );
                      } else {
                        await dispatch(
                          updateAssignment({
                            assignment: assignmentDetails,
                            actionType: 'draft',
                            showModal,
                            modalType: 'saveResponse',
                            resetAssignments,
                            id: editId,
                          }),
                        );
                      }
                    }}
                  >
                    <Button color="#2073fa" text={isEditing ? 'Edit' : 'Save'} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TeacherLayout>
      {
        <div
          className={`w-full h-full backdrop-blur-sm bg-gray-100/50 fixed left-0 flex justify-center items-center ${
            modalWrapperDisplay ? 'showModal' : 'hideModal'
          }`}
        >
          {modalWrapperDisplay && (
            <div className="relative w-[90vw] max-w-[850px] bg-white rounded-xl overflow-hidden overflow-y-scroll max-h-[90vh] mx-auto">
              <span
                className="text-[22px] absolute right-8 top-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all ease-in-out opacity-60"
                onClick={hideModal}
              >
                <FaTimes />
              </span>
              {modalItemsDisplay.saveResponse && (
                <div className="w-full md:py-20 md:px-24 px-12 py-16 font-semibold text-center text-xl">
                  <p>You have successfully saved an assignment</p>
                  <p>
                    Click on{' '}
                    <span
                      className="font-bold text-[#2073fa] cursor-pointer"
                      onClick={() => {
                        switchModal('historyResponse');
                      }}
                    >
                      ASSIGNMENT HISTORY
                    </span>{' '}
                    to view your Assignment.
                  </p>
                </div>
              )}
              {modalItemsDisplay.createResponse && (
                <div className="w-full md:py-20 md:px-24 px-12 py-16 font-semibold text-center text-xl">
                  <p>You have successfully created an assignment</p>
                  <p>
                    Click on{' '}
                    <span
                      className="font-bold text-[#2073fa] cursor-pointer"
                      onClick={() => {
                        switchModal('historyResponse');
                      }}
                    >
                      ASSIGNMENT HISTORY
                    </span>{' '}
                    to view your Assignment.
                  </p>
                </div>
              )}
              {modalItemsDisplay.cancelResponse && (
                <div className="w-full md:py-20 md:px-24 px-12 py-16 font-semibold text-center text-xl">
                  <p className="text-xl">
                    Are you sure you want to{' '}
                    <span className="text-[#E30F0F] text-center">Cancel?</span>
                  </p>
                  <div className="flex flex-row-reverse gap-4 mt-4">
                    <span
                      onClick={() => {
                        hideModal();
                      }}
                    >
                      <Button color="#2073fa" text="No" />
                    </span>
                    <Link href="/curriculum/">
                      <span
                        onClick={() => {
                          setIsEditing(false);
                          setEditId('');
                        }}
                      >
                        <Button color="#2073fa" text="Yes" />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
              {modalItemsDisplay.historyResponse && (
                <div className="md:p-12 py-12 px-7 min-h-[500px] w-[90vw] max-w-[800px]">
                  <h3 className="text-2xl font-semibold">Assignment History</h3>
                  <div className="flex gap-6 items-center mt-8">
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor: historyType === 'active' ? '#2073fa' : 'white',
                      }}
                      onClick={() => setHistoryType((prev) => 'active')}
                    >
                      Active
                    </span>
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor: historyType === 'completed' ? '#2073fa' : 'white',
                      }}
                      onClick={() => setHistoryType((prev) => 'completed')}
                    >
                      Completed
                    </span>
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor: historyType === 'draft' ? '#2073fa' : 'white',
                      }}
                      onClick={() => setHistoryType((prev) => 'draft')}
                    >
                      Draft
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-3">
                    {assignments?.map((assignment: any, index: number) => {
                      if (assignment.status.toLowerCase() === historyType.toLowerCase()) {
                        return (
                          <SingleAssignment
                            setEditAssignment={setEditAssignment}
                            assignment={assignment}
                            key={index}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              )}
              {modalItemsDisplay.skillsResponse && (
                <SkillModal
                  skills={assingmentSkills}
                  hideModal={hideModal}
                  handleSkillCheckboxChange={handleSkillCheckboxChange}
                  skillCheckbox={skillCheckbox}
                />
              )}
              {modalItemsDisplay.studentResponse && (
                <StudentModal
                  students={students?.students}
                  hideModal={hideModal}
                  handleStudentCheckboxChange={handleStudentCheckboxChange}
                  handleAllStudentChechbox={handleAllStudentChechbox}
                  allStudentCheckbox={allStudentCheckbox}
                  studentCheckbox={studentCheckbox}
                />
              )}
            </div>
          )}
        </div>
      }
    </>
  );
};

export default Assignments;
