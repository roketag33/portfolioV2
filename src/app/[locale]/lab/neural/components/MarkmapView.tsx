import React, { useRef, useEffect } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'
import 'markmap-toolbar/dist/style.css'

interface MarkmapHooksProps {
    markdown: string
}

export default function MarkmapView({ markdown }: MarkmapHooksProps) {
    const ref = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const transformer = new Transformer()
        const { root } = transformer.transform(markdown)
        const mm = Markmap.create(ref.current, undefined, root)

        if (mm) {
            const { el } = Toolbar.create(mm)
            el.style.position = 'absolute'
            el.style.bottom = '1rem'
            el.style.right = '1rem'
            ref.current.parentElement?.append(el)

            return () => {
                mm.destroy()
                el.remove()
            }
        }
    }, [markdown])

    return <svg ref={ref} className="w-full h-full text-white" />
}
