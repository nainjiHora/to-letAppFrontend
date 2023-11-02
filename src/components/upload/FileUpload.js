import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { ArrowClockwise } from "react-bootstrap-icons";
import { Image, Button } from "react-bootstrap";

const FileUpload = ({
  Imagevalues,
  setImagevalues,
  loadingDelete,
  setLoadingDelete,
  Images,
  setImages,
}) => {
  const [visible, setVisible] = useState(false);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = Imagevalues.images;
    let temp = Images;
    if (files) {
      setLoadingDelete(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(`${process.env.REACT_APP_API}/upload/addimage`, {
                image: uri,
              })
              .then((res) => {
                setLoadingDelete(false);
                allUploadedFiles.push(res.data);
                temp.push(res.data.url);
                setImages(temp);
                setImagevalues({ ...Imagevalues, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoadingDelete(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoadingDelete(true);

    let temp = Images;
    axios
      .post(`${process.env.REACT_APP_API}/upload/removeimage`, { public_id })
      .then((res) => {
        setLoadingDelete(false);
        const { images } = Imagevalues;
        let filteredImages = images.filter(
          (item) => item.public_id !== public_id
        );

        setImagevalues({ ...Imagevalues, images: filteredImages });

        temp.splice(0, temp.length);
        filteredImages.forEach((x, i) => temp.push(x.url));
        setImages(temp);
        temp.splice(0, temp.length);
      })
      .catch((err) => {
        setLoadingDelete(false);
      });
  };

  return (
    <>
      <div className="row">
        {!loadingDelete ? (
          Imagevalues.images &&
          Imagevalues.images.map((image) => (
            <div key={image.public_id} className="col-md-3">
              <Image
                className="m-1 p-1 img-thumbnail"
                src={image.url}
                onClick={() => setVisible(true)}
              />
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => handleImageRemove(image.public_id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <ArrowClockwise className="text-danger h1" />
        )}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Upload Images
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
