//method : GET /dashboard
exports.dashboard = async(req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Free Note Storage App'
    }

    
    res.render("dashboard/db-page", {
        locals,
        layout: '../views/layouts/dashboard'
    })
}
