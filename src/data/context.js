import React from "react";

const UpdateContext = React.createContext({
    language: "en",
    setLanguage: () => {}
});
export default UpdateContext