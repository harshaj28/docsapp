import Icon from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import { getSession } from 'next-auth/client';
import Login from '../components/Login'
import  Modal from '@material-tailwind/react/Modal'
import  ModalBody from '@material-tailwind/react/ModalBody'
import  ModalFooter  from '@material-tailwind/react/ModalFooter'
import { useState,useEffect } from 'react'
import fire from "../firebase"
import firebase from 'firebase/app'
import {useCollectionOnce} from "react-firebase-hooks/firestore"
import {useRouter} from "next/dist/client/router"
import DocumentRow from '../components/DocumentRow'

export default function Home({session}) {
  const router=useRouter();
  const [showModal,setShowModal]=useState(false);
  const [input,setInput]=useState('');
  const [docs, setDocs] = useState([]);
  const docsRef = fire.firestore()
  .collection('userDocs')
  .doc(session?.user.email)
  .collection('docs');
  
  useEffect(() => {
    const unsub = docsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))

    return unsub
  }, [])

  const createDocument=()=>{
    if(!input) return;
    fire.firestore().collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .add({
      fileName:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
    setShowModal(false);
  }
  if(!session) return <Login/>;
  const modal=(
    <Modal
    size="sm"
    active={showModal}
    toggler={()=>setShowModal(false)}
    >
      <ModalBody>
        <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        type="text"
        className="outline-none w-full"
        placeholder='Enter the name for document'
        onKeyDown={(e)=>e.key==="Enter"&&createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
        color="blue"
        buttonType="link"
        onClick={(e)=>setShowModal(false)}
        ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <meta name="description" content="Document Generation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {modal}
      <section className='bg-[#F8F9FA] pb-10 px-10'>
        <div className='max-w-3xl mx-auto my-auto'>
          <div className='flex items-center justify-between py-3'>
            <h2 className='text-gray-700 font-medium text-md'>Start a new document</h2>
            <Button
            color="#fff"
            buttonType="outline"
            iconOnly={true}
            rounded={true}
            ripple="dark"
            className="border-0 hover:bg-gray-200"
            >
              <Icon name="more_vert" size="2xl" />
            </Button>
          </div>
          <div onClick={()=>setShowModal(true)}>
            <div className='relative h-40 w-32 border-2 cursor-pointer hover:border-blue-400'>
            <Image src="https://links.papareact.com/pju" layout="fill"/>
            </div>
            <p className='ml-2 mt-2 text-sm font-medium'>Blank</p>
          </div>
        </div>
      </section>
      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-6 text-gray-700 text-sm'>
          <div className='flex items-center justify-between pb-3'>
            <h2 className='font-medium flex-grow'>Recent Documents</h2>
            <p className='mr-12'>Date Created</p>
            <Icon name="folder" size="xl" color="gray" />  
          </div> 
        
        {docs?.map(doc=>(
          <DocumentRow
          key={doc.id}
          id={doc.id}
          doc={doc}
          session={session}
          />
        ))}
        </div>
      </section>
      <h2 className='flex justify-center'>Designed and Developed By Harshaj Singh Parihar</h2>
    </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {session}
  }
}