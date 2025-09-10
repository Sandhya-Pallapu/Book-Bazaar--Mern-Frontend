import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import Footer from "./components/Footer";
import WishListPage from './pages/WishListPage';
import AdminDashboard from './pages/admindashboard';
import AddBookForm from './pages/AddBookForm';
import EditBookPage from './pages/EditBookPage'
import { AuthProvider } from "./context/AuthContext";
import { WishListProvider } from './context/WishListContext';
import PrivateRoute from "./utils/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './pages/ChatPage';
import InboxPage from "./pages/InboxPage";
import EditBookForm from './pages/EditBookForm';
import PostBookPage from './pages/PostBook';
import ProfilePage from './pages/ProfilePage';

// Wrapper to use useLocation
const AppRoutes = () => {
  const location = useLocation();
  const showFooter = location.pathname === "/"; // show footer only on landing page

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={
          <PrivateRoute>
            <WishListPage />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute adminOnly={true}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/post-book" element={<AddBookForm />} />
        <Route path="/admin/edit-book/:id" element={<EditBookForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:sellerEmail/:sellerName" element={<ChatPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
        <Route path="/post-book" element={<PostBookPage />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <WishListProvider>
        <Router>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </WishListProvider>
    </AuthProvider>
  );
}

export default App;







