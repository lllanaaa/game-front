import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

export default (loader) => {
    return Loadable({
        loader,
        loading() {
            return <Spin />
        },
    });
}
