
module.exports = {
    addImage: (req, res) => {
        const db = req.app.get('db');
        const image = req.body;
        
        db.add_image([image.title, image.imgUrl, image.locationState, false])
    },
    getAllImages: (req, res) => {
        const db = req.app.get('db');
        db.get_all_images().then(images => {
            res.send(images);
        })
    },
    removeImage: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.remove_image([id]);
    },    
    changeImageFeatured: (req, res) => {
        console.log('hi')
        const db = req.app.get('db');
        const image = req.body;
        const imageId = req.params.myId;
        const imageFeatured = req.params.notFeatured
        console.log('contrler')
        db.change_image_featured([imageId, imageFeatured]).then(images => {
            res.send(images);
        })
    }
}