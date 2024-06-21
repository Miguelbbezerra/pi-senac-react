export function setItemLocalStorage(key:string, value:string) {
    localStorage.setItem(key, value)
}

export function deleteItemLocalStorage(key:string) {
    localStorage.removeItem(key)
}

export function getItemLocalStorage(key:string) {
    return localStorage.getItem(key)
}