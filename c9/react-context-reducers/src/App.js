import React from 'react'
import AppProvider from './AppProvider'
import Third from './Third'
import Second from './Second'

const App = () => {

	return (
		<AppProvider>
			<div>I am the app</div>
			<Third />
			<Second />
		</AppProvider>
 	)
}

export default App