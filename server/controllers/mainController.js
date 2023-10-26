//method : GET /homepage

exports.homepage = async(req, res) => {
    const locals = {
        title: 'iKeep Notes',
        description: 'Free Note Storage App'
    }
    
    res.render("index", locals)
}