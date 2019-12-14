export default (req, res) => {
    res.status(200).json({ time: new Date().toISOString() })
}
