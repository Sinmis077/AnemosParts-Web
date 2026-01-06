import React from 'react';
import {cn} from '@/app/utils/cn.js';

function Divider({
                     className, ...props
                 }) {
    return (<hr
        className={cn('my-3 border-gray-400 border-1 rounded rounded', className)}
        {...props} />);
}

export {Divider};