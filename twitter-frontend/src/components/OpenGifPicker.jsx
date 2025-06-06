import React from "react";
import GifPicker from "gif-picker-react";
import { tenor } from "../common/ApiKey";
import ModalBG from "./ModalBG";

const OpenGifPicker = ({show, onclose, target}) => {
  if (!show) {
    return null;
  }

  return (
    <div>
        <ModalBG show={show} onClose={onclose} transparent={true}/>
        <GifPicker tenorApiKey={tenor} onGifClick={(gif)  => {target(gif.url); onclose()}}/>
    </div>
  );
}

export default OpenGifPicker;