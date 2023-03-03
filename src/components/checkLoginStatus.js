const checkLoginStatus = async () => {
    try {
        const response = await fetch("https://connectius-api-moiqj.ondigitalocean.app/auth", {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            }
        }); 
        const json = await response.json();
        return json["result"] === "true" ? true : false;
    } catch(error) {
        return null;
    }
}

export default checkLoginStatus;
  