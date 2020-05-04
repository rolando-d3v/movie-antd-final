import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Modal } from "antd";
import "./ModalVideo.scss";

export default function ModalVideo(props) {
  const { videoKey, videoPlatform, isOpen, close } = props;
  const [urlVideo, setUrlVideo] = useState(null);

  useEffect(() => {
    switch (videoPlatform) {
      case "YouTube":
        setUrlVideo(`https://youtu.be/${videoKey}`);
        break;

      case "Vimeo":
        setUrlVideo(`https://vimeo.com/${videoKey}`);
        break;

      default:
        break;
    }
  }, [videoPlatform, videoKey]);


  return (
    <Modal
      className="modal-video"
      visible={isOpen}
      centered
      onCancel={close}
      footer={false}
    >
      <ReactPlayer url={urlVideo} controls width="90%" height="90%" /> 
    </Modal>
  );
}
