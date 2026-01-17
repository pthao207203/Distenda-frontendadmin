// controllers/livestream.controller.js

import {
  livestreamsService,
  livestreamDetailService,
  livestreamCreateService,
  livestreamEditService,
  livestreamChangeStatusService,
  livestreamDeleteService,
} from "../services/livestream.service";

// LIST
export async function livestreamsController(setLoading, params) {
  try {
    setLoading(true);
    const result = await livestreamsService(params);
    setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}

// DETAIL
export async function livestreamDetailController(LivestreamID, setLoading) {
  try {
    if (setLoading) setLoading(true);
    const result = await livestreamDetailService(LivestreamID);
    if (setLoading) setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    if (setLoading) setLoading(false);
  }
}

// CREATE
export async function livestreamCreateController(setLoading, data) {
  try {
    setLoading(true);

    const payload = {
      LivestreamTitle: data.LivestreamTitle,
      LivestreamDescription: data.LivestreamDescription,
      LivestreamStartedAt: data.LivestreamStartedAt,
    };

    const result = await livestreamCreateService(payload);
    setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}



// EDIT
export async function livestreamEditController(
  setLoading,
  LivestreamID,
  data
) {
  try {
    setLoading(true);

    const payload = {
      LivestreamTitle: data.LivestreamTitle,
      LivestreamDescription: data.LivestreamDescription,
      LivestreamStartedAt: data.LivestreamStartedAt,
    };

    const result = await livestreamEditService(LivestreamID, payload);
    setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}


// CHANGE STATUS
export async function livestreamChangeStatusController(
  setLoading,
  LivestreamID,
  status
) {
  try {
    setLoading(true);
    const result = await livestreamChangeStatusService(
      LivestreamID,
      status
    );
    setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}

// DELETE
export async function livestreamDeleteController(setLoading, LivestreamID) {
  try {
    if (setLoading) setLoading(true);

    const result = await livestreamDeleteService(LivestreamID);

    if (setLoading) setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    if (setLoading) setLoading(false);
  }
}

