import React from 'react';
import { Form } from 'antd';

let number = 0;

const AntdForm = (el: any) => {
    return Form.create({
        name: `form${++number}`
    })(el);
};

export default AntdForm;
