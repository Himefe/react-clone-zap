import { createSlice } from "@reduxjs/toolkit";

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        (state.loading = true), (state.data = null), (state.error = null);
      },
      fetchSuccess(state, action) {
        (state.loading = true),
          (state.data = action.payload),
          (state.error = null);
      },
      fetchError(state, action) {
        (state.loading = true),
          (state.data = null),
          (state.error = action.payload);
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);

      let response = await fetch(url, options);
      let json = await response.json();

      if (!response.ok) throw json.message;

      dispatch(fetchSuccess(json));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
