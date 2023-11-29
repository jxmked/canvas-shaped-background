/**
 * https://webpack.js.org/guides/progressive-web-application/
 * */
export default () => {
  if (process.env.NODE_ENV === 'development') return;

  if ('serviceWorker' in navigator) {
    const sw_script = './service-worker.js'

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(sw_script)
        .then((registration) => {
          console.log('SW registered');
        })
        .catch((registrationError) => {
          console.log('SW registration failed');
        });
    });
  }
};
