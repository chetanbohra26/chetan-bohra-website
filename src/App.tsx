import Content from './components/views/Content';
import Navbar from './components/views/Navbar';

function App() {
	return (
		<div className="text-white flex flex-col h-screen scroll-none">
			<Navbar />
			<div className="bg-zinc-950 px-0 flex flex-col flex-grow scroll-smooth">
				<Content />
			</div>
		</div>
	);
}

export default App;
