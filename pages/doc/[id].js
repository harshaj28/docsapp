import  Button  from "@material-tailwind/react/Button"
import  Icon  from "@material-tailwind/react/Icon"
import {useRouter} from "next/dist/client/router"
import fire from "../../firebase"
import {useDocumentOnce} from "react-firebase-hooks/firestore"
import { getSession,signOut,useSession } from "next-auth/client"
import Login from "../../components/Login"
import TextEditor from "../../components/TextEditor"


function Doc({session}) {
    const router=useRouter();
    const {id}=router.query;
    const [snapshot,loadingSnapchot]=useDocumentOnce(fire.firestore().collection('userDocs').doc(session?.user.email).collection
    ('docs').doc(id))
    if(!loadingSnapchot&&!snapshot?.data()?.fileName){
        router.replace('/')
    }
    if(!session) return <Login/>
    
    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span className="cursor-pointer" onClick={()=>router.push("/")}>
                <Icon name="description" size="5xl" color="blue" />
                </span>
                <div className="flex-grow px-2">
                    <h2 className="font-medium text-xl">{snapshot?.data()?.fileName}</h2>
                    <div className="flex items-center text-sm space-x-1 -ml-1 h-8
                    text-gray-600">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Inset</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>
                <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                className="hidden md:inline-flex h-10 border-0"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="Light"
                >
                    <Icon name="people" size="md" /> SHARE
                </Button>
                <img onClick={signOut} className="rounded-full cursor-pointer h-10 w-10 ml-6" src={session?.user.image} />
            </header>
            <TextEditor/>
        </div>
    )
}
export default Doc
export async function getServerSideProps(context){
    const session = await getSession(context)
    return{
        props:{
            session
        }
    }
}