import { useEffect, useState } from 'react'
export default function A() {
  const [a, setA] = useState(1)
  useEffect(() => {
    if (a)
      console.log('a')
  }, [])
  return (
    <div className="sss">a</div>
  )
}
