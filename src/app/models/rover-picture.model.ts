export interface RoverPicture {
  cameraName: string;
  numberOfPhotos: number;
  samplePhotoUri: string;
}

export interface RoverPictures {
  roverPictures: RoverPicture[];
}
