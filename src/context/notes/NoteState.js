import NoteContext from "./noteContext";

const NoteState =(props)=>{
        const state = {
            "name":"anshul",
            "class":"5"
        };
    return(
      // eslint-disable-next-line
        <NoteContext.provider value={state}>
            {props.children}
        </NoteContext.provider>
    )
}


export default NoteState;