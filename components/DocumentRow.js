import  Button  from "@material-tailwind/react/Button";
import  Icon  from "@material-tailwind/react/Icon";
import {useRouter} from "next/dist/client/router"
import firebase from "firebase";
import fire from "../firebase";

function DocumentRow({id,doc,session}) {
    const router=useRouter();

    var cityRef = fire.firestore().collection('userDocs').doc(session?.user.email).collection('docs').doc(id)
    var removeCapital =()=>(
        cityRef.delete()
    )
    return(
        <div className="flex items-center max-w-3xl mx-auto p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon onClick={()=> router.push(`/doc/${id}`)} name="article" size="3xl" color="blue"/>
            <p onClick={()=> router.push(`/doc/${id}`)} className="flex-grow pl-5 w-10 pr-10 truncate">{doc?.fileName}</p>
            <p className="pr-5 text-sm">{doc?.timestamp?.toDate().toLocaleDateString()}</p>
                <Icon onClick={()=>(removeCapital())} name="delete" size="2xl" />
            
        </div>
    )
}
export default DocumentRow;