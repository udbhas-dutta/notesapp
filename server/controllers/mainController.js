
//method : GET /homepage
exports.homepage = async(req, res) => {
    const locals = {
        title: 'iKeep Notes',
        description: 'Free Note Storage App'
    }
    
    res.render("index", locals)
    //this index is the index.ejs created in the layouts folder
}

//method : GET /about
exports.about = async(req, res) => {
    const locals = {
        title: 'About - iKeep Notes',
        description: 'Free Note Storage App'
    }
    
    res.render("about", locals)
    //this about is the about.ejs created in the layouts folder
}

