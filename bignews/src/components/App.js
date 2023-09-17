import Main from "./Main.js"
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import AppCSS from './App.module.css';
import Button from '@mui/material/Button';



export default function App() {
  const [user] = useAuthState(auth);
  // console.log(user);
  return (
    <>
    <div className={AppCSS.App}>
      <span className={AppCSS.title}> The Big Times📜 
      <p className={AppCSS.desc}> summarize the big details </p></span>

{
  user ?
  <section style={{"width" : "100%", "height": "70%"}}>
         <Main>
          <SignOut />
        </Main> 
      </section>
        : <SignIn/> 
}

    <footer>© 2023 The Big News</footer>
    </div>
        </>

  );
}

function SignIn() {

  const signInWithGoogle = async () => {
    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    // console.log({ ...userCred.user })
    const userDetails = {
      uid: userCred.user.uid,
      name: userCred.user.displayName,
      email: userCred.user.email,
      photoUrl: userCred.user.photoURL,
      provider: userCred.user.providerData[0].providerId,
    }
    console.log(userDetails)
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    // localStorage.setItem('uid', userDetails.uid);
    // localStorage.setItem('name', userDetails.name);
    // localStorage.setItem('email', userDetails.email);
    // localStorage.setItem('photoUrl', userDetails.photoUrl);
    // localStorage.setItem('provider', userDetails.provider);
  }


  return (
    <>
    
      {/* <button className="sign-in" >Sign in with Google</button> */}
      <Button variant="text" size="large" onClick={signInWithGoogle}>-------- Get Started --------</Button>
    </>
  )
}

function SignOut() {
  
  return auth.currentUser && (
    <>

      {/* Logged in as: <b>
        {auth.currentUser.displayName} &nbsp;
      </b> */}
      <Button variant="text" onClick={() => signOut(auth)}>Sign Out</Button>
    </>
  )
}






