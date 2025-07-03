import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


function App() {
  const [user, setUser]=useState<unknown | undefined>(undefined);

  useEffect(()=>{
    const authenticateUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
      } else {
        setUser(data.user);
      }
    }

    authenticateUser()

  },[])
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }



  return (
    <>
    {user?<button onClick={signOut}>loggout</button>:<button onClick={()=>{
      supabase.auth.signInWithOAuth({
        provider: 'google',
      })
    }}> googleOauth</button>}
    </>
  )
}

export default App
