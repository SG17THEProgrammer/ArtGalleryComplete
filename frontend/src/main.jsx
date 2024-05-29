import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/Auth.jsx';
// import { store } from './redux/index.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
          bodyClassName="toastBody"

        />
      {/* </Provider> */}

    </React.StrictMode>
  </AuthProvider>
)
