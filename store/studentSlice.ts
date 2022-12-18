import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import studentService from "services/studentService";
import { IUserStudent, Student } from "types/interfaces";
import { RootState } from "./store";

const initialState: IUserStudent = {
  newStudent: null,
  students: [],
};

export const addStudent: any = createAsyncThunk(
  "new/student",
  async (data: Student, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const { id } = state.currentClass;
    try {
      return await studentService.addStudent(data, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStudents: any = createAsyncThunk(
  "get/students",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const { id } = state.currentClass;
    try {
      return await studentService.getStudents(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addStudent.pending, () => {
        console.log("Loading...");
      })
      .addCase(addStudent.rejected, (_, action) => {
        console.log(`Error: ${action.payload}`);
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getStudents.pending, () => {
        console.log("Loading...");
      })
      .addCase(getStudents.rejected, (_, action) => {
        console.log(`Error: ${action.payload}`);
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        console.log(action.payload);
        state.students = action.payload;
      });
  },
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;
