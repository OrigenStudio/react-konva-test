// @flow
import * as React from 'react';
import { Rect, Text, Group } from 'react-konva';

const RectangleWithText = ({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    name,
    text,
    fontSize,
    rectFill,
    fontFill,
    strokeFill,
    dragBoundFunc,
    onDragEnd,
    onTransformEnd,
}) => (
        <Group
            name={name}
            dragBoundFunc={dragBoundFunc}
            onDragEnd={onDragEnd}
            onTransformEnd={onTransformEnd}
            x={x}
            y={y}
            scaleX={scaleX}
            scaleY={scaleY}
            draggable
        >
            <Rect
                width={width}
                height={height}
                fill={rectFill}
                strokeFill={strokeFill}
                shadowBlur={10}
            />
            <Text
                text={text}
                width={width}
                height={height}
                fontSize={fontSize}
                fill={fontFill}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );

RectangleWithText.defaultProps = {
    rectFill: 'orange',
    fontFill: '#fff',
    strokeFill: '#aaa',
    fontSize: 16,
};

export default RectangleWithText;
