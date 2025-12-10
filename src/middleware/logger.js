const logger = (req, res, next) => {
    const { method, host } = req
    const time = new Date().toLocaleTimeString('fr')

    console.log(`${time} : ${method} - ${host}`)

    next()
}

export default logger