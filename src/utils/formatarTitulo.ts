export function formatToLink(titulo:string) {
    return titulo.slice(10).replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '').toLowerCase()
}