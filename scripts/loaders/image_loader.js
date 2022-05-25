class ImageLoader {

    load() {
        ships = loadImage('assets/images/ships.png')
        tiles = loadImage('assets/images/tiles.png')

        return new GameImages(
            ships,
            tiles
        );
    }
}