export const handleAuthentication = (req, res) => {
    const user = req.body

    if (isValid(user)) {

    } else {
        res.status(403).json({ message: 'Dados inválidos' })
    }
}

function isValid(user) {
    if (!user) {
        return false
    }
}