import { memo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './components/theme-provider';
import Content from './components/views/Content';
import Navbar from './components/views/Navbar';

const App = memo(() => {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='text-white flex flex-col min-h-screen'>
				<Navbar />
				<div className='bg-zinc-950 flex flex-col flex-1 overflow-y-auto scroll-smooth'>
					<Content />
				</div>
				<Analytics />
			</div>
		</ThemeProvider>
	);
});

App.displayName = 'App';

export default App;
