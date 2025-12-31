'use client'

import { memo, useState, useRef, useEffect } from 'react'
import { Handle, Position, NodeResizer, NodeProps, useReactFlow } from '@xyflow/react'
import { Input } from '@/components/ui/input'

const CustomNode = ({ id, data, selected }: NodeProps) => {
    const { setNodes } = useReactFlow()
    const [isEditing, setIsEditing] = useState(false)
    const [labelText, setLabelText] = useState((data.label as string) || 'Node')
    const inputRef = useRef<HTMLInputElement>(null)

    const bgColor = data.bg || '#ffffff'
    const borderColor = data.borderColor || '#777'
    const textColor = data.color || '#000000'
    const shape = data.shape || 'rounded' // rounded, circle, diamond, parallelogram, database, file

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLabelText(data.label as string)
    }, [data.label])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
            inputRef.current?.select()
        }
    }, [isEditing])

    const onSubmit = () => {
        setIsEditing(false)
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, label: labelText } }
                }
                return node
            })
        )
    }

    const onKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Enter') {
            onSubmit()
        }
    }

    // Base Styles
    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        minWidth: '100px',
        minHeight: '60px',
        position: 'relative',
    }

    // specific styles for the shape container
    const baseShapeStyle: React.CSSProperties = {
        backgroundColor: bgColor as string,
        border: `1px solid ${borderColor}`,
        color: textColor as string,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }

    const baseInnerContentStyle: React.CSSProperties = {
        padding: '10px',
        zIndex: 10,
        width: '100%',
    }

    const shapeStyle = { ...baseShapeStyle }
    const innerContentStyle = { ...baseInnerContentStyle }

    // Logic to modify styles based on shape
    if (shape === 'circle') {
        shapeStyle.borderRadius = '50%'
    } else if (shape === 'rounded') {
        shapeStyle.borderRadius = '5px'
    } else if (shape === 'diamond') {
        shapeStyle.transform = 'rotate(45deg)'
        shapeStyle.borderRadius = '2px'
        innerContentStyle.transform = 'rotate(-45deg)'
    } else if (shape === 'parallelogram') {
        shapeStyle.transform = 'skew(-20deg)'
        shapeStyle.borderRadius = '2px'
        innerContentStyle.transform = 'skew(20deg)'
    } else if (shape === 'file') {
        shapeStyle.clipPath = 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)'
    }

    let ShapeRender: React.ReactNode

    if (shape === 'file') {
        ShapeRender = (
            <div style={{ ...containerStyle }} className="shadow-sm filter drop-shadow-sm">
                <div style={{ ...shapeStyle, position: 'absolute', top: 0, left: 0 }}>
                    <div style={innerContentStyle}>
                        {isEditing ? (
                            <Input
                                ref={inputRef}
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                                onBlur={onSubmit}
                                onKeyDown={onKeyDown}
                                className="h-8 text-center bg-transparent border-none shadow-none focus-visible:ring-0 p-0 text-inherit font-inherit w-full"
                            />
                        ) : (
                            <span className="pointer-events-none select-none px-2 break-words max-w-full">
                                {labelText}
                            </span>
                        )}
                    </div>
                </div>
                {/* The Fold */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '15%',
                        height: '15%',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderLeft: `1px solid ${borderColor}`,
                        borderBottom: `1px solid ${borderColor}`,
                        borderBottomLeftRadius: '2px',
                        background: 'linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.05) 50%)'
                    }}
                />
            </div>
        )
    } else if (shape === 'database') {
        // Improved Database Shape using simpler CSS stacking
        // Base Cylinder
        const databaseContainerStyle = { ...containerStyle, background: 'transparent', display: 'flex', flexDirection: 'column' } as React.CSSProperties

        ShapeRender = (
            <div style={databaseContainerStyle} className="group">
                {/* Top Cap */}
                <div style={{
                    height: '20%',
                    width: '100%',
                    border: `1px solid ${borderColor}`,
                    background: bgColor as string,
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    zIndex: 2,
                }} />

                {/* Body */}
                <div style={{
                    position: 'absolute',
                    top: '10%', // Halfway down the top cap to blend
                    bottom: 0,
                    width: '100%',
                    border: `1px solid ${borderColor}`,
                    borderTop: 'none',
                    background: bgColor as string,
                    borderBottomLeftRadius: '50% 20%',
                    borderBottomRightRadius: '50% 20%',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ ...innerContentStyle, marginTop: '10%' }}>
                        {isEditing ? (
                            <Input
                                ref={inputRef}
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                                onBlur={onSubmit}
                                onKeyDown={onKeyDown}
                                className="h-8 text-center bg-transparent border-none shadow-none focus-visible:ring-0 p-0 text-inherit font-inherit w-full"
                            />
                        ) : (
                            <span className="pointer-events-none select-none px-2 break-words max-w-full">
                                {labelText}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        // Default rendering for rounded, circle, diamond, parallelogram
        ShapeRender = (
            <div style={shapeStyle} className="shadow-sm">
                <div style={innerContentStyle}>
                    {isEditing ? (
                        <Input
                            ref={inputRef}
                            value={labelText}
                            onChange={(e) => setLabelText(e.target.value)}
                            onBlur={onSubmit}
                            onKeyDown={onKeyDown}
                            className="h-8 text-center bg-transparent border-none shadow-none focus-visible:ring-0 p-0 text-inherit font-inherit w-full"
                        />
                    ) : (
                        <span className="pointer-events-none select-none px-2 break-words max-w-full">
                            {labelText}
                        </span>
                    )}
                </div>
            </div>
        )
    }

    // Handle Styles - Small dots
    const handleStyle = { width: 8, height: 8, background: '#777', zIndex: 50 };

    return (
        <>
            <NodeResizer
                minWidth={50}
                minHeight={50}
                isVisible={selected}
                lineClassName="border-blue-400"
                handleClassName="h-3 w-3 bg-white border-2 border-blue-400 rounded"
            />

            {/* Top Handles */}
            <Handle type="target" position={Position.Top} id="t-in" style={{ ...handleStyle, left: '30%' }} />
            <Handle type="source" position={Position.Top} id="t-out" style={{ ...handleStyle, left: '70%' }} />

            {/* Right Handles */}
            <Handle type="target" position={Position.Right} id="r-in" style={{ ...handleStyle, top: '30%' }} />
            <Handle type="source" position={Position.Right} id="r-out" style={{ ...handleStyle, top: '70%' }} />

            {/* Bottom Handles */}
            <Handle type="target" position={Position.Bottom} id="b-in" style={{ ...handleStyle, left: '30%' }} />
            <Handle type="source" position={Position.Bottom} id="b-out" style={{ ...handleStyle, left: '70%' }} />

            {/* Left Handles */}
            <Handle type="target" position={Position.Left} id="l-in" style={{ ...handleStyle, top: '30%' }} />
            <Handle type="source" position={Position.Left} id="l-out" style={{ ...handleStyle, top: '70%' }} />

            <div
                onDoubleClick={() => setIsEditing(true)}
                className="shadow-sm hover:shadow-md transition-shadow h-full w-full"
                style={{ width: '100%', height: '100%' }}
            >
                {ShapeRender}
            </div>
        </>
    )
}

export default memo(CustomNode)
