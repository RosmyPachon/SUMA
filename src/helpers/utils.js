export const generarID = () => {
    const random = Math.random().toString(15).substr(2);
    const fecha = Date.now().toString(15)
    return random + fecha
}
