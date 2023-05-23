import React from 'react';
import "./MyLoader.css"


const MyLoader= () => {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default MyLoader;