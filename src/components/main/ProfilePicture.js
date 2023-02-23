import React from "react";

export default function ProfilePicture(props) {
    const { contentType, data } = props.image;
    const base64String = btoa(new Uint8Array(data.data).reduce((data, byte) => data + String.fromCharCode(byte),''));
    const imageUrl = `data:${contentType};base64,${base64String}`;
    return <img src={imageUrl} alt="Profile Picture" />;    
}