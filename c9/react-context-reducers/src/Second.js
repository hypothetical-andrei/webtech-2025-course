import React from 'react'
import { useAppState } from './hooks'

const Second = () => {
	const state = useAppState()
  return (
		<div>
			<h2>
				The count is {state.counter.count}
			</h2>
		</div>
  )
}

export default Second