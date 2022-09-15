import { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate =(props)=>{
        const s1 = {
            "name":"anshul",
            "class":"5"
        };
        const[state,setState] = useState(s1);
      let  update=()=>{
            setTimeout(() => {
                setState({
                    "name":"akshay",
                    "class":"7"
                })
            }, 1000);
        }
    return(
        <Notecontext.Provider value={{state,update}}>
            {props.children}
        </Notecontext.Provider>
    )
}


export default Notestate;