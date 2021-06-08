
export default function getFullBackendAddress(type="api") {

  if(type === "api") {
    if(process.env.REACT_APP_APOLLO_USING_DOMAIN === "true") 
      return `${process.env.REACT_APP_APOLLO_ADDRESS}${process.env.REACT_APP_APOLLO_ENDPOINT}`;
    else
      return `${process.env.REACT_APP_APOLLO_ADDRESS}:${process.env.REACT_APP_APOLLO_PORT}${process.env.REACT_APP_APOLLO_ENDPOINT}`;
  } else if(type === "media") {
    if(process.env.REACT_APP_MEDIA_SERVER_USING_DOMAIN === "true")
      return `${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}`;
    else
      return `${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}:${process.env.REACT_APP_MEDIA_SERVER_PORT}`;
  } else {
    return null;
  }
}