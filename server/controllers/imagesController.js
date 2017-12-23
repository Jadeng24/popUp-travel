
module.exports = {
    addImage: (req, res) => {
        const db = req.app.get('db');
        const image = req.body;
        
        db.add_image([image.title, image.imgUrl, image.locationState])
    },
    getAllImages: (req, res) => {
        const db = req.app.get('db');
        db.get_all_images().then(images => {
            res.send(images);
        })
    }     
}