import React from "react";

export const ProfilePic = ({ classes }) => {
  return (
    <img className={"pfp " + classes} src="/pfp.jpg"/>
  );
}



export const ProfileBG = ({ classes }) => {
  return (
    <img className={"banner-photo " + classes} src="/bgpic.png"/>
  );
}

