import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/auth";
import './index.css';
import Map from './Home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Home from "./pages/home";
import AdminPage from "./pages/admin"
import SubscriberPage from "./pages/subscriber"
import Navigation  from './components/header/Navigation';
import SubscriberForm from "./pages/subscriber/form"
import SubscriberPayments from  "./pages/subscriber/payments"
import SubsrcriberListings from "./pages/subscriber/post"
import SubscriberProfile from "./pages/subscriber/profile"
import Main from './pages/main';
import AdminUsersPage from "./pages/admin/user"
import AdminListingPage from "./pages/admin/listing"
import AdminHomePage from "./pages/admin/index"
import AdminPayments from './pages/admin/payment';
import AdminEnquiry from "./pages/admin/enquiry"
import ListingDetails from './pages/ListingDetails';
import LocationPageListing from './pages/location';
import CategoryListingPage from './pages/Category';
import ForgotPassword from './pages/forgot-password';
import PrivacyPolicy from './pages/privacyPolicy';
import AboutUsPage from './pages/aboutus';
import TermsOfServicePage from './pages/terms';
import Footer from './components/footer/Footer';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div >
    <Router>
   
   <AuthProvider>
    <Toaster/>
     <Navigation/>
     <Routes>
     <Route path="/map" element={<App />} />
       <Route path="/" element={<Main />} />
       <Route path="/home" element={<Home />} />
       <Route path="/signin" element={<SignIn />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       <Route path="/about-us" element={<AboutUsPage />} />
       <Route path="/terms-service" element={<TermsOfServicePage />} />





       <Route path="/admin/home" element={<AdminPage />} />
       <Route path="/subscriber/home" element={<SubscriberPage />} />
       <Route path="/subscriber/form" element={<SubscriberForm />} />
       <Route path="/subscriber/payments" element={<SubscriberPayments />} />
       <Route path="/subscriber/ads" element={<SubsrcriberListings />} />
       <Route path="/subscriber/dashboard" element={<SubscriberProfile />} />
       {/* <Route path="/subscriber/pricing" element={<SubscriberPricing />} /> */}

       <Route path="/admin/home" element={<AdminHomePage />} />
       <Route path="/admin/users" element={<AdminUsersPage />} />
       <Route path="/admin/listing" element={<AdminListingPage />} />
       <Route path="/admin/payments" element={<AdminPayments />} />
       <Route path="/admin/enquiry" element={<AdminEnquiry />} />



       <Route path="/ads/:listingId" element={<ListingDetails />} />
       <Route path="/ads/location/:state" element={<LocationPageListing />} />
       <Route path="/ads/category/:category" element={<CategoryListingPage />} />


       
       <Route path="/app" element={<Map />} />
     </Routes>
     <Footer/>
     </AuthProvider>
   
   </Router>
    </div>
  );
}

export default App;