import React, { isValidElement } from 'react'

export interface Props {
  name: string
}

const kjj = ' sssss'

function d(a: number) {
  if (a > 10)
    return <div>hello</div>
}

export default function a({ name }: Props) {
  return (
    <div>a</div>
  )
}
