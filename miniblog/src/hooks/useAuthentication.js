import {db} from".../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPasswoard,
    updateProfile,
    signOut
} from 'firebase/Auth'

import {useState,useEffect} from "react";

export const useAuthentication = () => {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    const [canceledd,setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(canceledd){
            return;
        }
    }
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.passwoard
            )
            await updateProfile(user,{
                displayName:data.displayName
            });

            setLoading(false);

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            }else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente";
            }
            setLoading(false);
            setError(systemErrorMessage);
        }
    
    };

    const logout = () => {
        checkIfIsCancelled();
        
        signOut(auth)
    }
    
    const login = async(data) => {
        checkIfIsCancelled();
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPasswoard(auth,data.email,data.passwoard);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado."
            }else if(error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta."
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente."
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    useEffect(() => {
        return() => setCancelled(true);
    },[]);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};

