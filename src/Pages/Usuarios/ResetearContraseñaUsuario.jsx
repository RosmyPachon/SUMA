
const ResetearContraseñaUsuario = () => {
    return (
        <div className="bg-white w-2/4 h-auto flex items-center flex-col py-5 rounded-lg shadow-xl max-w-5xl flex-wrap">
            <h1 className="text-2xl font-semibold">Resetear <span className="text-primaryYellow">contraseña</span></h1>
            <br />
            <p className="text-gray-500">Ingrese una nueva contraseña </p>

            <form className="flex flex-col gap-3 pt-4 w-2/4">

                <input
                    type="text"
                    placeholder="Nueva contraseña"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-200"
                />
                <input
                    type="text"
                    placeholder="Confirmar nueva contraseña"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-200"
                />
                <input type="submit" className="mt-3 p-2 mx-2 rounded-md font-semibold
                bg-secundaryYellow hover:bg-primaryYellow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-200" />
            </form>
        </div>
    )
}

export default ResetearContraseñaUsuario