import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './components/theme-provider';
import Content from './components/views/Content';
import Navbar from './components/views/Navbar';

const App = () => {
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
};

export default App;
