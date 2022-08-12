import './loading.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className='spinner'>
      <div className='spinner-text'>Loading ...</div>
    </div>
  );
}

export default LoadingScreen;
