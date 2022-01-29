import Container from './components/Container';
import Page from './components/Page';

export default function App() {
  return (
    <Container>
      <h1 className='max-w-2xl mx-auto p-6 font-medium text-gray-700 text-xl'>
        React Pagination Class Component
      </h1>
      <Page />
    </Container>
  );
}
