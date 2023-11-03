import { useState } from "react";
import { Images } from "../data/ImageData";
import AfterSelectHeader from "./AfterSelectHeader";
import PreviewImage from "./PreviewImage";
import AddImage from "./AddImage";
const Gallery = () => {
  // selected store
  const [selectedImages, setSelectedImages] = useState([]);

  // image store you can select image 
  const [images, setImages] = useState(Images);
  const [draggedImage, setDraggedImage] = useState(null);
  const [dragedID, setDragedID] = useState(null);

  // mage click works.
  const handleImageClick = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  //handle unselected function
  const handleUnselect = () => {
    setSelectedImages([]);
  };

  //drag drop function 
  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageId", image._id);
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.id && setDragedID(e?.target?.children[0]?.id);
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();
    const sourceImageId = e.dataTransfer.getData("imageId");
    const updatedImages = images.slice();
    const sourceIndex = images.findIndex(
      (image) => image._id === sourceImageId
    );
    const targetIndex = images.findIndex(
      (image) => image._id === targetImage._id
    );

    updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);

    setImages(updatedImages);
    setDraggedImage(null);
    setDragedID(null);
  };

  //image delete function
  const handleDelete = (e) => {
    e.preventDefault();
    const deleteItemFilter = images.filter(
      (image) => !selectedImages.includes(image._id)
    );
    setImages(deleteItemFilter);
    setSelectedImages([]);
  };

  return (
    <div className="gallery-main  pb-5 px-2">
      {/*  head*/}
      {selectedImages.length === 0 ? (
        <p className="text-2xl font-bold p-5 flex items-center ">
          Ollyo_Image_Gallery
        </p>
      ) : (
        <AfterSelectHeader
          handleUnselect={handleUnselect}
          selectedImages={selectedImages}
          handleDelete={handleDelete}
        />
      )}

      <hr className="mb-4 font-bold" />

      {/*  body  */}
      <div onDragOver={handleDragOver} className="gallery-body ">
        {images?.map((image) => (
          <div
            className="gallery-item relative"
            key={image._id}
            onDrop={(e) => handleDrop(e, image)}
          >
            <div
              className="w-full h-full"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
            >
              <img
                src={image.image}
                className={` hover:opacity-[0.5] w-full h-full rounded duration-300 bg-white`}
                alt={`Image ${image._id}`}
              />

              <div className="absolute w-full  h-full bg-black top-0 left-0 opacity-0  hover:opacity-50 duration-300 cursor-move">
                <input
                  checked={false}
                  readOnly
                  onClick={() => handleImageClick(image._id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox"
                  id={image._id}
                />
              </div>
              {/* when drag start a image then user can see preview  */}
              {dragedID == image._id && (
                <PreviewImage draggedImage={draggedImage} />
              )}
            </div>
            {selectedImages.includes(image._id) && (
              <div
                className={` absolute w-full h-full bg-black top-0 left-0 opacity-30 cursor-auto`}
              >
                <input
                  id={image._id}
                  defaultChecked
                  onClick={() => handleImageClick(image._id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox2"
                />
              </div>
            )}
          </div>
        ))}

        <AddImage setImages={setImages} images={images} />
      </div>
    </div>
  );
};

export default Gallery;
