//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export const checkId = (id) => {
    if(!id) throw 'Error: You must provide an id to search for';
    if(typeof id !== "string") throw "Error: id must be a string";
    id = id.trim();
    if(id.length === 0) throw "Error: id cannot be an empty string";
    return id;
}