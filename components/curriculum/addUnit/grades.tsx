import React, { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaPlus } from "react-icons/fa";
import { updateGrades } from "store/unitsSlice";

const Grade: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { grades, chosenGrades } = useSelector(
    (state: RootState) => state.unit.addUnit
  );
  return (
    <article className="flex flex-row gap-x-2 relative">
      <div
        className={`${styles.topic} ${
          openedModal === "grade"
            ? " outline-mainPurple"
            : "outline-transparent"
        }`}
        onClick={(event: any) => {
          if (!event.target.classList.contains("dropdown")) {
            updateOpenedModal("grade");
          }
        }}
      >
        <h1>Grade(s)</h1>
        <i>
          <FaPlus />
        </i>
<<<<<<< HEAD
        {openedModal === "grade" && (
          <div className={`${styles.preview}`}>
            {grades.length === 0 && (
              <h1 className="text-center p-2 font-bold font-lg">
                Please select one or more levels
              </h1>
            )}
            {grades.length > 0 &&
              grades.map((grade, index: number) => {
                return (
                  <div className={`${styles.inputContainer}`} key={index}>
                    <input
                      type="checkbox"
                      id={grade}
                      className="accent-mainPurple dropdown"
                      checked={chosenGrades.includes(grade)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.checked) {
                          dispatch(updateGrades({ value: grade, type: "add" }));
                        } else {
                          dispatch(
                            updateGrades({
                              value: grade,
                              type: "remove",
                            })
                          );
                        }
                      }}
                    />
                    <label htmlFor={grade} className="dropdown">
                      {grade}
                    </label>
                  </div>
                );
              })}
          </div>
        )}
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
      </div>
      <div className={styles.numbersSelectedContainer}>
        {chosenGrades.length} grades selected
      </div>
    </article>
  );
};

export default Grade;
