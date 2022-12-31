import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "axios.config"
import { getAccessToken } from "utils/getTokens"

export const getSchedule = createAsyncThunk("scheduleSlice/getSchedule", async (name, thunkApi) => {
	try {
		const { data } = await http.get("/academics/calendar/schedules/", {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		console.log(data)
		return data
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const postSchedule = createAsyncThunk("scheduleSlice/postSchedule", async (addedRecords: any, thunkApi) => {
	try {
		delete addedRecords[0].Id
		const { data } = await http.post("/academics/calendar/schedules/", addedRecords, {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const putSchedule = createAsyncThunk("scheduleSlice/putSchedule", async (updatedRecords: any, thunkApi) => {
	for(var i = 0; i < updatedRecords.length; i++) {
		var a = updatedRecords[i];

		for (var key in a) {
			if (a.hasOwnProperty(key)) {
				a[key.charAt(0).toLowerCase() + key.substring(1)] = a[key];
				delete a[key];
			}
		}
		updatedRecords[i] = a
	}

	try {
		const { data } = await http.put(
			`/academics/calendar/schedules/${updatedRecords[0].Id}`,
			{ ...updatedRecords },
			{
				headers: {
					Authorization: `Bearer ${getAccessToken()}`
				}
			}
		)
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const deleteSchedule = createAsyncThunk("scheduleSlice/deleteSchedule", async (deletedRecords: any, thunkApi) => {
	try {
		for(var i = 0; i < deletedRecords.length; i++) {
			var a = deletedRecords[i];

			for (var key in a) {
				if (a.hasOwnProperty(key) && key !== 'Subject') {
					a[key.charAt(0).toLowerCase() + key.substring(1)] = a[key];
					delete a[key];
				}
			}
			deletedRecords[i] = a
		}
		console.log(deletedRecords)

		const { data } = await http.delete("/academics/calendar/schedules/delete/", {
			data: JSON.stringify(deletedRecords),
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
