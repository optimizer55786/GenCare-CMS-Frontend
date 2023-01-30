import { useRef, useState, useCallback } from "react";
import replace from "../../../assets/icons/file-upload-replace.svg";
import trash from "../../../assets/icons/file-upload-delete.svg";
import placeholder from "../../../assets/icons/placeholder.jpg";
import uploadIcon from "../../../assets/icons/upload.svg";
import "./FileUpload.less";
import { uploadImage } from "../../../services/request";
import { serialize } from "object-to-formdata";
import { useDropzone } from "react-dropzone";
import { Formik } from "formik";

function OldFileUpload({
  name,
  setFieldValue,
  myPlaceholder,
}: FileUploadProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="upload-container">
      <img
        onClick={() => {
          if (null !== imageRef.current) {
            imageRef.current.click();
          }
        }}
        src={imageUrl ? imageUrl : myPlaceholder || placeholder}
        className="upload-image"
      />
      <div className="upload-controls text-mulish-medium">
        <div
          className="single-controls"
          onClick={() => {
            if (null !== imageRef.current) {
              imageRef.current.click();
            }
          }}
        >
          <img src={replace} />
          Replace
        </div>
        <div
          className="single-controls"
          onClick={() => {
            setImageUrl("");
            if (setFieldValue) setFieldValue(name, "");
          }}
        >
          <img src={trash} />
          Delete
        </div>
      </div>
      <input
        ref={imageRef}
        style={{
          display: "none",
        }}
        type="file"
        accept=".png,.jpg,.jpeg"
        name={name}
        onChange={async (event) => {
          if (event.target.files) {
            const imageDetails = event.target.files[0];
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setImageUrl(imageUrl);
            let imageName;
            if (name) {
              imageName = Date.now() + name + imageDetails.name;
            } else {
              imageName = Date.now() + imageDetails.name;
            }
            let { data } = await uploadImage(
              serialize({
                file: event.target.files[0],
                name: imageName,
              })
            );
            setFieldValue(name, data.url);
          }
        }}
      />
    </div>
  );
}

export const FileUpload = ({
  name,
  size = "large",
  setFieldValue,
  myPlaceholder = "thumbnail image",
  placeholderDimension = "1170x400",
  maxSize = 5,
}: FileUploadProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    if (acceptedFiles.length) {
      const imageDetails = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(imageDetails);
      const smartImageName = imageDetails.name.replaceAll(" ", "");
      setImageUrl(imageUrl);
      let imageName;
      if (name) {
        imageName = Date.now() + smartImageName;
      } else {
        imageName = Date.now() + smartImageName;
      }

      if (setFieldValue) {
        let { data } = await uploadImage(
          serialize({
            file: acceptedFiles[0],
            name: imageName,
          })
        );
        setFieldValue(name, data.url);
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  const ReplaceRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className={`${size}-upload-container`} {...getRootProps()}>
        {imageUrl.length ? (
          <img
            src={imageUrl ? imageUrl : myPlaceholder || placeholder}
            className={`${size}-upload-image`}
          />
        ) : (
          <div className="default-text">
            <div>
              <img src={uploadIcon} />
            </div>
            <p className="text-paragraph">
              Drag & drop a {myPlaceholder} Recommended size:
              {placeholderDimension} Max {maxSize}MB (png, jpg, gif)
            </p>
          </div>
        )}
        <div ref={ReplaceRef} style={{ display: "none" }}></div>
        <input {...getInputProps()} />
      </div>
      {imageUrl.length ? (
        <div className={`${size}-upload-controls text-mulish-medium`}>
          <div
            onClick={() => {
              if (ReplaceRef) ReplaceRef.current?.click();
            }}
            className="single-controls"
          >
            <img src={replace} />
            Replace
          </div>
          <div
            className="single-controls"
            onClick={() => {
              setImageUrl("");
              if (setFieldValue) setFieldValue(name, "");
            }}
          >
            <img src={trash} />
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const MiniFileUpload = ({
  name,
  size = "large",
  setFieldValue,
  myPlaceholder = "thumbnail image",
  placeholderDimension = "1170x400",
  maxSize = 5,
}: FileUploadProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    if (acceptedFiles.length) {
      const imageDetails = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(imageDetails);
      const smartImageName = imageDetails.name.replaceAll(" ", "");
      setImageUrl(imageUrl);
      let imageName;
      if (name) {
        imageName = Date.now() + smartImageName;
      } else {
        imageName = Date.now() + smartImageName;
      }

      if (setFieldValue) {
        let { data } = await uploadImage(
          serialize({
            file: acceptedFiles[0],
            name: imageName,
          })
        );
        setFieldValue(name, data.url);
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  const ReplaceRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className={`${size}-upload-container`} {...getRootProps()}>
        {imageUrl.length ? (
          <img
            src={imageUrl ? imageUrl : myPlaceholder || placeholder}
            className={`${size}-upload-image`}
          />
        ) : (
          <div className="default-text">
            <div>
              <img src={uploadIcon} />
            </div>
            <p className="text-paragraph">icon</p>
          </div>
        )}
        <div ref={ReplaceRef} style={{ display: "none" }}></div>
        <input {...getInputProps()} />
      </div>
      {imageUrl.length ? (
        <div className={`${size}-upload-controls text-mulish-medium`}>
          {/* <div
            onClick={() => {
              if (ReplaceRef) ReplaceRef.current?.click();
            }}
            className="single-controls"
          >
            <img src={replace} />
            Replace
          </div> */}
          <div
            className="single-controls"
            onClick={() => {
              setImageUrl("");
              if (setFieldValue) setFieldValue(name, "");
            }}
          >
            <img src={trash} />
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
};

type FileUploadProps = {
  name?: string;
  setFieldValue?: any;
  myPlaceholder?: string;
  placeholderDimension?: string;
  maxSize?: number;
  size?: string;
};

export default FileUpload;
