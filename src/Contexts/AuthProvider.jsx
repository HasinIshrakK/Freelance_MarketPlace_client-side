import React, { createContext, useState } from 'react';
import auth from '../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        signInWithPopup(auth, provider);
    };

    const value = {
        user,
        setUser,
        googleSignIn,
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;