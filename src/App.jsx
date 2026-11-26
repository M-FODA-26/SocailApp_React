import { lazy, Suspense } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import UserContextProvider from './CounterContext/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNetworkState } from 'react-use'
import Loader from './components/Loader/Loader'

const Home = lazy(() => import('./components/Home/Home'))
const Register = lazy(() => import('./Auth/Register/Register'))
const Login = lazy(() => import('./Auth/Login/Login'))
const Profile = lazy(() => import('./components/Profile/Profile'))
const PostDetails = lazy(() => import('./components/PostDetails/PostDetails'))
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile'))
const ChangePassword = lazy(() => import('./components/ChangePassword/ChangePassword'))

const queryClient = new QueryClient()

let router=createBrowserRouter([
{path:'',element:<Layout/>,children:[
  {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
  {index:true,element:<AuthRoute><Register/></AuthRoute>},
  {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
  {path:'ChangePassword',element:<ProtectedRoute><ChangePassword/></ProtectedRoute>},
  {path:'user-profile/:username',element:<ProtectedRoute><UserProfile/></ProtectedRoute>},
  {path:'postDetails/:id',element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
  {path:'login',element:<AuthRoute><Login/></AuthRoute>}
]}
])



function App() {
  const { online } = useNetworkState()

  return (
    <>
   {!online&& <div className={'bg-gray-800/65 fixed inset-0 z-50 flex items-center justify-center text-white text-4xl font-bold '}>
      <h1>Yuo are offline now!...</h1>
    </div>}
 <QueryClientProvider client={queryClient}>
<UserContextProvider>

     <Suspense fallback={<Loader />}>
     <RouterProvider router={router} />
     </Suspense>
    <ToastContainer autoClose={1000} />
</UserContextProvider>

 </QueryClientProvider>

 
   
   
    </>
  )
}

export default App
