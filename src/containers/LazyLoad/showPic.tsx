import React from 'react';

interface Props {
    imgs: string[];
}

const LazyLoad = (props: Props) => {
    return (
        <div>
            {props.imgs.map((img, index) => (
                <img style={{ display: 'block' }} key={index} data-img={img} height={300} width={400} />
            ))}
        </div>
    );
};

export default LazyLoad;
