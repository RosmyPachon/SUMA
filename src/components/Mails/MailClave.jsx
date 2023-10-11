

export const MailClave = ({ usuario, clave }) => {

    return (
        <div>
            <p>Cordial saludo, {usuario}!</p>
            <br />
            <p>En el presente correo le informamos que su clave del sistema SUMA a sido modificada.</p>
            <p>En caso no solicitar este cambio, ponerse en contacto con el equipo de soporte de SUMA.</p>
            <br />
            <p>Nueva Clave: <strong>{clave}</strong></p>
            <br />
            <br />
            <p>Saludos,</p>
            <img src="../../img/img_logoDevitech.png" alt="Logo Empresa" />
        </div>
    )
}

