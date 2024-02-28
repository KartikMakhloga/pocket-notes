const BASE_URL = import.meta.env.VITE_BASE_URL;

export const group = {
    CREATE_GROUP: BASE_URL + "/createGroup",
    GET_GROUPS: BASE_URL + "/groups"
}

export const note = {
    CREATE_NOTE: BASE_URL + "/createNotes",
    GET_NOTES_BY_GROUP: BASE_URL + "/notes",
}