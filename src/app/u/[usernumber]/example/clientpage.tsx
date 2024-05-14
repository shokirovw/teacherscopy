'use client';
import dynamic from 'next/dynamic'
import { useState } from 'react';

const ComponentA = dynamic(() => import('../../../../components/date-demo'))

export default function ClientPage () {
    const [showMore, setShowMore] = useState(false)
 
    return (
      <div>
   
        {/* Load on demand, only when/if the condition is met */}
        {showMore && <ComponentA />}
        <button onClick={() => setShowMore(!showMore)}>Toggle</button>
      </div>
    )
}