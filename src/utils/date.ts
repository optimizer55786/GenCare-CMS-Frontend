
export function convertFullDateWithStringMonth (date: string) {
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}