export function SetItemLocalStorage(key:string, value:string) {
    localStorage.setItem(key, value)
}

export function DeleteItemLocalStorage(key:string) {
    localStorage.removeItem(key)
}

export function GetItemLocalStorage(key:string) {
    return localStorage.getItem(key)
}
