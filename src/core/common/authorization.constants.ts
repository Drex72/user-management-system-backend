/**
 * Enumeration of permission types associated with API actions.
 * @readonly
 * @enum {string}
 */
export const permissionAbility = {
    /** Permission to read data */
    read: "GET",
    /** Permission to create data */
    write: "POST",
    /** Permission to update data */
    edit: "PUT",
    /** Permission to delete data */
    delete: "DELETE",
    /** Permission for all operations */
    full: "ALL",
};