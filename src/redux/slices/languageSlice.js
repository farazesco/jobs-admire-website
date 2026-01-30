import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    addLanguage: (state, action) => {
      state.lang = action.payload
    }
  }
})

export const { addLanguage } = languageSlice.actions

export const languageSelector = (state) => _.get(state, 'language.lang', '')

export default languageSlice.reducer
