
module.exports = {
    getAllProducts: (req, res) => {
        const db = req.app.get('db');
        db.get_all_products().then(products => {
            
            res.send(products);
        })
    },
    addProduct: (req, res) => {
        const db = req.app.get('db');
        const product = req.body;
        db.add_product(product.title, product.description, product.imgUrl, product.price,product.in_stock)
    }
}