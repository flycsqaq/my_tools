import React from 'react';

const Test = () => {
    return <div>test</div>;
};

function log(target: any) {
    console.log(target);
}

export default log(Test);
