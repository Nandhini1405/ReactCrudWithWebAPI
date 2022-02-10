import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formateDate = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

// Get All Candidates
export const fetchAll = () => (dispatch) => {
  api
    .dCandidate()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

// Insert Record
export const create = (data, onSuccess) => (dispatch) => {
  data = formateDate(data);
  api
    .dCandidate()
    .create(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: response.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

// Update Record
export const update = (id, data, onSuccess) => (dispatch) => {
  data = formateDate(data);
  api
    .dCandidate()
    .update(id, data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

// Delete Record

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .dCandidate()
    .delete(id)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
