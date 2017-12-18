
module.exports = {
    getAllProducts: (req, res) => {
        const db = req.app.get('db');
        console.log('hello');
        db.get_all_products().then(products => {
            
            res.send(products);
        })
    }

}