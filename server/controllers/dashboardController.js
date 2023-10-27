//method : GET /dashboard
exports.dashboard = async(req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Free Note Storage App'
    }

    const layoutPath = '../views/layouts/dashboard'
    console.log("Layour path:", layoutPath);
    
    res.render("dashboard/db-page", {
        locals,
        layout: '../views/layouts/dashboard'
    })
}
